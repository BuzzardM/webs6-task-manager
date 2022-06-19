import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IProjectMember} from "../../../../../models/projectMember";

@Component({
  selector: 'app-add-user-story',
  templateUrl: './add-user-story.component.html',
  styleUrls: ['./add-user-story.component.sass']
})
export class AddUserStoryComponent {
  addUserStoryForm: FormGroup;
  members: IProjectMember[];

  constructor(public dialogRef: MatDialogRef<AddUserStoryComponent>, private formBuilder: FormBuilder) {
    this.addUserStoryForm = this.formBuilder.group({
      title: '',
      description: '',
      points: 0,
      owner: '',
      status: 'new'
    })

    // TODO: get members from backend with getProject() or getProjectMembers() or something
    this.members = [];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
