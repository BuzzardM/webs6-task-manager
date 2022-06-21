import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ISprint} from "../../../models/sprint";
import {SprintService} from "../../../services/sprint/sprint.service";
import {AddSprintComponent} from "./modals/add-sprint/add-sprint.component";
import {ActivatedRoute} from "@angular/router";
import {EditSprintDialogComponent} from "./modals/edit-sprint-dialog/edit-sprint-dialog.component";
import {SetActiveDialogComponent} from "./modals/set-active-dialog/set-active-dialog.component";
import {ProjectService} from "../../../services/project/project.service";

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.sass']
})
export class SprintsComponent implements OnInit {
  projectId = this.route.snapshot.paramMap.get("projectId");
  activeSprint: string | undefined;
  displayedColumns = ['title', 'description', 'start_date', 'end_date', 'actions'];
  dataSource = new MatTableDataSource<ISprint>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService: UserService, private sprintService: SprintService, private projecService: ProjectService, private dialog: MatDialog) {
    if (this.projectId != null) {
      this.sprintService.getProjectSprints(this.projectId).subscribe(s => {
        this.dataSource.data = s;
      });

      this.projecService.getProject(this.projectId).subscribe(p => {
        this.activeSprint = p.active_sprint;
      })
    }
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.value.project_id = this.projectId;

        const sprint = result.value as ISprint;
        this.sprintService.addSprint(sprint);
      }
    })
  }

  editSprintModal(sprint: ISprint) {
    const dialogRef = this.dialog.open(EditSprintDialogComponent, {
      width: '60%',
      data: sprint
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        sprint.title = result.value.title;
        sprint.description = result.value.description;
        sprint.start_date = result.value.start_date;
        sprint.end_date = result.value.end_date;

        this.sprintService.updateSprint(sprint);
      }
    })
  }

  setActiveSprintModal(sprintId: string) {
    const dialogRef = this.dialog.open(SetActiveDialogComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projecService.setActiveSprint(sprintId, this.projectId!);
      }
    })
  }
}
