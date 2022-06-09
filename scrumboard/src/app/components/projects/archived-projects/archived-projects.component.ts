import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {IProject} from "../../../models/project";
import {ProjectStatus} from "../../../enums/projectStatus";
import {UserRole} from "../../../enums/roles";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user/user.service";
import {ProjectService} from "../../../services/project/project.service";
import {MatDialog} from "@angular/material/dialog";
import {IProjectMember} from "../../../models/projectMember";
import {ArchiveProjectDialogComponent} from "../archive-project-dialog/archive-project-dialog.component";
import {RestoreProjectDialogComponent} from "../restore-project-dialog/restore-project-dialog.component";

@Component({
  selector: 'app-archived-projects',
  templateUrl: './archived-projects.component.html',
  styleUrls: ['./archived-projects.component.sass']
})
export class ArchivedProjectsComponent implements OnInit {
  projects: Observable<IProject[]> | undefined;
  userEmail: string | null | undefined;
  projectStatus = ProjectStatus;
  userRole = UserRole;

  //table variables
  displayedColumns = ['title', 'description', 'status', 'owner', 'actions'];
  dataSource = new MatTableDataSource<IProject>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private authService: AuthService, private userService: UserService, private projectService: ProjectService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userEmail = this.authService.getUser()?.email;

    if (this.userEmail != null) {
      this.projectService.getArchivedProjects(this.userEmail).subscribe(p => {
        this.dataSource.data = p;
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getProjectRole(members: [IProjectMember]): string {
    let member = members.find(i => i.email == this.userEmail);
    return member !== undefined ? member.role : 'No role';
  }

  getProjectOwner(members: [IProjectMember]): string {
    let member = members.find(i => i.role == this.userRole.owner);
    if (member !== undefined)
      return member.email == this.userEmail ? 'You' : member.name;
    else
      return 'No one';
  }

  restoreProjectModal(project: IProject): void {
    const dialogRef = this.dialog.open(RestoreProjectDialogComponent, {
      width: '60%',
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        project.status = this.projectStatus.open;
        this.projectService.restoreProject(project);
      }
    })
  }
}
