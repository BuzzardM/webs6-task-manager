import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ITask} from "../../../../../models/task";
import {SprintService} from "../../../../../services/sprint/sprint.service";
import {MatSelectionListChange} from "@angular/material/list";

@Component({
  selector: 'app-assign-task-dialog',
  templateUrl: './assign-task-dialog.component.html',
  styleUrls: ['./assign-task-dialog.component.sass']
})
export class AssignTaskDialogComponent {
  tasks: ITask[] | undefined;
  selectedTasks = [];

  constructor(public dialogRef: MatDialogRef<AssignTaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private sprintService: SprintService) {
    this.sprintService.getUnassignedTasks(data.sprintId, data.projectId).subscribe(t => {
      this.tasks = t;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
