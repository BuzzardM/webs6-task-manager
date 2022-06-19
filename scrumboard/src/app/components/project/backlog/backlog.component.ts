import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {IProject} from "../../../models/project";
import {AddUserStoryComponent} from "./modals/add-user-story/add-user-story.component";
import {IUserStory} from "../../../models/userStory";
import {UserStoryService} from "../../../services/user-story/user-story.service";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.sass']
})
export class BacklogComponent implements OnInit {
  userStories: Observable<IUserStory[]> | undefined;

  displayedColumns = ['title', 'status', 'actions'];
  dataSource = new MatTableDataSource<IUserStory>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private authService: AuthService, private userService: UserService, private userStoryService: UserStoryService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addUserStoryModal() {
    const dialogRef = this.dialog.open(AddUserStoryComponent, {
      width: '60%'
    });
  }

}
