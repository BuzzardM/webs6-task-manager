import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {Observable} from "rxjs";
import {ProjectService} from "../../services/project/project.service";
import {AuthService} from "../../services/auth.service";
import {IProject} from "../../models/project";
import {MatTableDataSource} from "@angular/material/table";
import {IProjectMember} from "../../models/projectMember";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {AddMemberDialogComponent} from "./add-member-dialog/add-member-dialog.component";
import {AddProjectDialogComponent} from "./add-project-dialog/add-project-dialog.component";
import {ProjectStatus} from "../../enums/projectStatus";
import {UserRole} from "../../enums/roles";
import {EditProjectDialogComponent} from "./edit-project-dialog/edit-project-dialog.component";
import {EditProjectMembersDialogComponent} from "./edit-project-members-dialog/edit-project-members-dialog.component";
import {ArchiveProjectDialogComponent} from "./archive-project-dialog/archive-project-dialog.component";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
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
      this.projectService.getProjects(this.userEmail).subscribe(p => {
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

  editProjectModal(project: IProject): void {
    const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      width: '60%',
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        project.title = result.value.title;
        project.description = result.value.description;
        project.status = result.value.status;

        this.projectService.updateProject(project);
      }
    })
  }

  editProjectMembersModal(project: IProject): void {
    const dialogRef = this.dialog.open(EditProjectMembersDialogComponent, {
      width: '60%',
      data: project.member_info
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        project.member_info = result;
        this.projectService.updateProject(project);
      }
    })
  }

  addProjectModal() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const memberInfo = {
          name: result.value.username,
          role: this.userRole.owner,
          email: this.userEmail
        }

        result.value.status = this.projectStatus.open;
        result.value.members = [this.userEmail];
        result.value.member_info = [memberInfo];

        delete result.value.username;
        const project = result.value as IProject;

        this.projectService.addProject(project);
      }
    })
  }

  addMemberModal(project: IProject) {
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      width: '60%',
      data: project.members
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // @ts-ignore
        project.members.push(result.value.email);
        project.member_info.push(result.value);
        this.projectService.updateProject(project);
      }
    })
  }

  archiveProjectModal(project: IProject): void {
    const dialogRef = this.dialog.open(ArchiveProjectDialogComponent, {
      width: '60%',
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        project.status = this.projectStatus.closed;
        this.projectService.archiveProject(project);
      }
    })
  }
}
