import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IProject} from '../../../models/project';

@Component({
  selector: 'app-archive-project-dialog',
  templateUrl: './archive-project-dialog.component.html',
  styleUrls: ['./archive-project-dialog.component.sass']
})
export class ArchiveProjectDialogComponent {

  constructor(public dialogRef: MatDialogRef<ArchiveProjectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public project: IProject) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
