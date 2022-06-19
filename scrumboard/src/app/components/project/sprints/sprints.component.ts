import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ISprint} from "../../../models/sprint";
import {SprintService} from "../../../services/sprint/sprint.service";
import {AddSprintComponent} from "./modals/add-sprint/add-sprint.component";

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.sass']
})
export class SprintsComponent implements OnInit {
  sprints: Observable<ISprint[]> | undefined;

  displayedColumns = ['title', 'status', 'actions'];
  dataSource = new MatTableDataSource<ISprint>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private authService: AuthService, private userService: UserService, private sprintService: SprintService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addSprintModal() {
    const dialogRef = this.dialog.open(AddSprintComponent, {
      width: '60%'
    });
  }

}
