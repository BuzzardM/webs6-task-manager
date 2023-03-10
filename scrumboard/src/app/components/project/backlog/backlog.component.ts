import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {AddTaskComponent} from "./modals/add-task/add-task.component";
import {ITask} from "../../../models/task";
import {TaskService} from "../../../services/task/task.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../../services/project/project.service";
import {IProjectMember} from "../../../models/projectMember";
import {ArchiveProjectDialogComponent} from "../../projects/archive-project-dialog/archive-project-dialog.component";
import {TaskStatus} from "../../../enums/taskStatus";
import {EditTaskComponent} from "./modals/edit-task/edit-task.component";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.sass']
})
export class BacklogComponent implements OnInit {
  projectId = this.route.snapshot.paramMap.get("projectId");
  members: IProjectMember[] | undefined;
  taskStatus = TaskStatus;
  displayedColumns = ['title', 'description', 'status', 'points', 'owner', 'actions'];
  dataSource = new MatTableDataSource<ITask>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private authService: AuthService, private userService: UserService, private taskService: TaskService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.projectId != null) {
      this.projectService.getProject(this.projectId).subscribe(p => {
        this.members = p.member_info;
      });

      this.taskService.getProjectTasks(this.projectId).subscribe(t => {
        this.dataSource.data = t;
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addTaskModal() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '60%',
      data: this.members
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.value.project_id = this.projectId;
        result.value.assigned_sprint = null;
        result.value.created_at = new Date();
        result.value.updated_at = new Date();

        const task = result.value as ITask;
        this.taskService.addTask(task);
      }
    })
  }

  editTaskModal(task: ITask): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '60%',
      data: {
        task: task,
        members: this.members
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        task.title = result.value.title;
        task.description = result.value.description;
        task.points = result.value.points;
        task.owner = result.value.owner;
        task.updated_at = new Date();

        this.taskService.updateTask(task);
      }
    })
  }

  archiveTaskModal(task: ITask): void {
    const dialogRef = this.dialog.open(ArchiveProjectDialogComponent, {
      width: '60%',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        task.status = this.taskStatus.done;
        this.taskService.archiveTask(task);
      }
    })
  }
}
