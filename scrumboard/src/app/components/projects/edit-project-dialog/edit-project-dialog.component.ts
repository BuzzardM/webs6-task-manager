import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProject } from '../../../models/project';
import {ProjectStatus} from "../../../enums/projectStatus";

@Component({
  selector: 'app-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.sass']
})
export class EditProjectDialogComponent {
  editProjectForm: FormGroup;
  projectStatus = ProjectStatus;

  constructor(public dialogRef: MatDialogRef<EditProjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IProject, private formBuilder: FormBuilder) {
    this.editProjectForm = this.formBuilder.group({
      title: data.title,
      description: data.description,
      status: data.status
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
