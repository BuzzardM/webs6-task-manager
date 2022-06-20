import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IProject} from "../../../../../models/project";
import {ITask} from "../../../../../models/task";

@Component({
  selector: 'app-archive-task',
  templateUrl: './archive-task-dialog.component.html',
  styleUrls: ['./archive-task-dialog.component.sass']
})
export class ArchiveTaskDialogComponent {

  constructor(public dialogRef: MatDialogRef<ArchiveTaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public task: ITask) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
