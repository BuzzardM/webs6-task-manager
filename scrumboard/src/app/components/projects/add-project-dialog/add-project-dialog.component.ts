import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.sass']
})
export class AddProjectDialogComponent {
  addProjectForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddProjectDialogComponent>, private formBuilder: FormBuilder) {
    this.addProjectForm = this.formBuilder.group({
      title: '',
      description: '',
      username: ''
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
