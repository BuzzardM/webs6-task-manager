import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ITask} from "../../../../../models/task";

@Component({
  selector: 'app-set-active-dialog',
  templateUrl: './set-active-dialog.component.html',
  styleUrls: ['./set-active-dialog.component.sass']
})
export class SetActiveDialogComponent {

  constructor(public dialogRef: MatDialogRef<SetActiveDialogComponent>, @Inject(MAT_DIALOG_DATA) public sprint: string) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
