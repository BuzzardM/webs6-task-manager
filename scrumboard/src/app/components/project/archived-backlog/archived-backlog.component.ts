import {Component, OnInit, ViewChild} from '@angular/core';
import {IProjectMember} from "../../../models/projectMember";
import {TaskStatus} from "../../../enums/taskStatus";
import {MatTableDataSource} from "@angular/material/table";
import {ITask} from "../../../models/task";
import {MatPaginator} from "@angular/material/paginator";
import {ProjectService} from "../../../services/project/project.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user/user.service";
import {TaskService} from "../../../services/task/task.service";
import {MatDialog} from "@angular/material/dialog";
import {RestoreTaskDialogComponent} from "./modals/restore-task-dialog/restore-task-dialog.component";

@Component({
  selector: 'app-archived-backlog',
  templateUrl: './archived-backlog.component.html',
  styleUrls: ['./archived-backlog.component.sass']
})
export class ArchivedBacklogComponent implements OnInit {
  projectId = this.route.snapshot.paramMap.get("uid");
  taskStatus = TaskStatus;
  members: IProjectMember[] | undefined;
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

      this.taskService.getArchivedProjectTasks(this.projectId).subscribe(t => {
        this.dataSource.data = t;
      });
    }
  }

  unarchiveTaskModal(task: ITask) {
    const dialogRef = this.dialog.open(RestoreTaskDialogComponent, {
      width: '60%',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        task.status = this.taskStatus.open;
        this.taskService.restoreTask(task);
      }
    })
  }
}
