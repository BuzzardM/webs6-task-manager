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

  constructor(private authService: AuthService, private userService: UserService, private projectService: ProjectService) {
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
    let member = members.find(i => i.user_id == this.userEmail);
    return member !== undefined ? member.role : 'No role';
  }
}
