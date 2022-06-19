import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ITask} from "../../../../../models/task";
import {TaskStatus} from "../../../../../enums/taskStatus";
import {IProjectMember} from "../../../../../models/projectMember";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.sass']
})
export class EditTaskComponent {
  editTaskForm: FormGroup;
  members: IProjectMember[];

  constructor(public dialogRef: MatDialogRef<EditTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    let task = data.task as ITask;
    this.members = data.members as IProjectMember[];

    this.editTaskForm = this.formBuilder.group({
      title: task.title,
      description: task.description,
      points: task.points,
      owner: task.owner
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
