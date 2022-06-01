import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {IUser} from "../../models/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
  user: IUser | undefined;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUser('test@test.nl').subscribe((res: IUser) => {
      this.user = res;
    });
  }
}
