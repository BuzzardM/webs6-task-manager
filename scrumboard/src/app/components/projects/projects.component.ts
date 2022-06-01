import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {IUser} from "../../models/user";
import {Observable} from "rxjs";
import {ProjectService} from "../../services/project/project.service";
import {IProject} from "../../models/project";
import {AuthService} from "../../services/auth.service";
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
  currentUser: Observable<IUser> | undefined;
  projects: Object | undefined;

  constructor(private authService: AuthService, private userService: UserService, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    const userEmail = this.authService.getUser()?.email;

    if (userEmail != null) {
      this.projects = this.projectService.getProjects(userEmail);
    }
  }
}
