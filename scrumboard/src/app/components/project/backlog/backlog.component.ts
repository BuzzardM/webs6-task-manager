import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {AddUserStoryComponent} from "./modals/add-user-story/add-user-story.component";
import {ITask} from "../../../models/task";
import {TaskService} from "../../../services/task/task.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../../services/project/project.service";
import {IProjectMember} from "../../../models/projectMember";
import {IProject} from "../../../models/project";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.sass']
})
export class BacklogComponent implements OnInit {
  projectId = this.route.snapshot.paramMap.get("uid");
  members: IProjectMember[] | undefined;
  displayedColumns = ['title', 'status', 'owner', 'actions'];
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

  addUserStoryModal() {
    const dialogRef = this.dialog.open(AddUserStoryComponent, {
      width: '60%',
      data: this.members
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.value.project_id = this.projectId;

        const task = result.value as ITask;
        this.taskService.addTask(task);
      }
    })
  }

}
