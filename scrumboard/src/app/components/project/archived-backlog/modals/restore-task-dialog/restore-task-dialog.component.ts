import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IProject} from "../../../../../models/project";
import {ITask} from "../../../../../models/task";

@Component({
  selector: 'app-restore-task-dialog',
  templateUrl: './restore-task-dialog.component.html',
  styleUrls: ['./restore-task-dialog.component.sass']
})
export class RestoreTaskDialogComponent {

  constructor(public dialogRef: MatDialogRef<RestoreTaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public task: ITask) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
