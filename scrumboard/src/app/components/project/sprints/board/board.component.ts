import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SprintService} from "../../../../services/sprint/sprint.service";
import {MatDialog} from "@angular/material/dialog";
import {ITask} from "../../../../models/task";
import {IProjectMember} from "../../../../models/projectMember";
import {ProjectService} from "../../../../services/project/project.service";
import {TaskStatus} from "../../../../enums/taskStatus";
import {moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TaskService} from "../../../../services/task/task.service";
import {mergeMap} from "rxjs";
import {AddSprintComponent} from "../modals/add-sprint/add-sprint.component";
import {ISprint} from "../../../../models/sprint";
import {AssignTaskDialogComponent} from "../modals/assign-task-dialog/assign-task-dialog.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  sprintId = this.route.snapshot.paramMap.get("sprintId");
  projectId = this.route.snapshot.paramMap.get("projectId");
  taskStatus = TaskStatus;
  tasks: ITask[] | undefined;
  members: IProjectMember[] | undefined;
  assignedTasks = new Map<string, Map<TaskStatus, ITask[]>>();

  constructor(private projectService: ProjectService, private taskService: TaskService, private route: ActivatedRoute, private sprintService: SprintService, private dialog: MatDialog) {

    if (this.sprintId != null && this.projectId != null) {
      this.projectService.getProject(this.projectId).pipe(
        mergeMap(p => {
          this.members = p.member_info;
          return this.sprintService.getSprintTasks(this.sprintId!);
        })
      ).subscribe(t => {
        this.initAssignedTasks(this.members!);
        this.tasks = [];

        for (let task of t) {
          if (task.assigned_to === undefined) {
            this.tasks?.push(task);
          } else if (task.assigned_to != undefined)
            this.assignedTasks.get(task.assigned_to)!.get(<TaskStatus>task.status)!.push(task);
        }
      });
    }
  }

  ngOnInit(): void {
  }

  initAssignedTasks(members: IProjectMember[]) {
    for (let member of members) {
      let userTasks = this.assignedTasks.set(member.email, new Map<TaskStatus, ITask[]>()).get(member.email)!;

      for (let status of Object.values(TaskStatus))
        userTasks.set(status, []);
    }
  }

  dropTask(event: any, member: string | null, status: TaskStatus | null) {
    if (event.previousContainer === event.container)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      let task = event.container.data[event.currentIndex];
      member === null ? delete (task.assigned_to) : task.assigned_to = member;
      if (status != null) task.status = status;

      this.taskService.updateTask(task);
    }
  }

  assignTaskModal() {
    const dialogRef = this.dialog.open(AssignTaskDialogComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
    })
  }
}
