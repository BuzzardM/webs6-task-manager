import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IProjectMember} from "../../../../../models/projectMember";

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrls: ['./add-sprint.component.sass']
})
export class AddSprintComponent {
  addSprintForm: FormGroup;
  today = new Date();
  minEnd = new Date();

  constructor(public dialogRef: MatDialogRef<AddSprintComponent>, private formBuilder: FormBuilder) {
    this.addSprintForm = this.formBuilder.group({
      title: '',
      description: '',
      start_date: '',
      end_date: ''
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeMinDate(event: any) {
    this.minEnd = new Date(event.value.getTime() + (1000 * 60 * 60 * 24));
  }
}
