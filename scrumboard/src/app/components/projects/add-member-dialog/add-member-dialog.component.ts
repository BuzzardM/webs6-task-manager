import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.sass']
})
export class AddMemberDialogComponent {
  addMemberForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddMemberDialogComponent>, private formBuilder: FormBuilder, private userService: UserService) {
    this.addMemberForm = this.formBuilder.group({
      email: '',
    });
  }

  async checkUser(event: any): Promise<void> {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
