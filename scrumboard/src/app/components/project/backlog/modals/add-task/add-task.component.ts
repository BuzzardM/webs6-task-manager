import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IProjectMember} from "../../../../../models/projectMember";
import {IProject} from "../../../../../models/project";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass']
})
export class AddTaskComponent {
  addUserStoryForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public members: IProjectMember[]) {
    this.addUserStoryForm = this.formBuilder.group({
      title: '',
      description: '',
      points: 0,
      owner: '',
      status: 'new'
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
