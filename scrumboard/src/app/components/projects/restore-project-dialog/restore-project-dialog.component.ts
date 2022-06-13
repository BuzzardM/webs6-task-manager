import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IProject} from "../../../models/project";

@Component({
  selector: 'app-restore-project-dialog',
  templateUrl: './restore-project-dialog.component.html',
  styleUrls: ['./restore-project-dialog.component.sass']
})
export class RestoreProjectDialogComponent {

  constructor(public dialogRef: MatDialogRef<RestoreProjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public project: IProject) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
