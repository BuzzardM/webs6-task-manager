import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {IUser} from "../../models/user";
import {Observable} from "rxjs";
import {ProjectService} from "../../services/project/project.service";
import {AuthService} from "../../services/auth.service";
import {IProject} from "../../models/project";
import {MatTableDataSource} from "@angular/material/table";
import {IProjectMember} from "../../models/projectMember";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {AddMemberDialogComponent} from "./add-member-dialog/add-member-dialog.component";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
  currentUser: Observable<IUser> | undefined;
  projects: Observable<IProject[]> | undefined;
  userEmail: string | null | undefined;

  //table variables
  displayedColumns = ['title', 'description', 'status', 'role', 'detail'];
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

  addMemberModal(project: IProject) {
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      width: '60%'
    })

    //TODO: check if user is in project
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // @ts-ignore
        project.members.push(result.value.email);
        project.member_info.push(result.value);
        this.projectService.updateProject(project);
      }
    })
  }
}
