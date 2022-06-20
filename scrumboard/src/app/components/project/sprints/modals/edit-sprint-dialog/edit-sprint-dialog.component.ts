import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-sprint-dialog',
  templateUrl: './edit-sprint-dialog.component.html',
  styleUrls: ['./edit-sprint-dialog.component.sass']
})
export class EditSprintDialogComponent{
  editSprintForm: FormGroup;
  today = new Date();
  minEnd = new Date();

  constructor(public dialogRef: MatDialogRef<EditSprintDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    let startDate = new Date(data.start_date.toDate());
    this.changeMinDate(startDate);

    this.editSprintForm = this.formBuilder.group({
      title: data.title,
      description: data.description,
      start_date: startDate,
      end_date: new Date(data.end_date.toDate())
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeMinDate(date: Date) {
    this.minEnd = new Date(date.getTime() + (1000 * 60 * 60 * 24));
  }
}
