import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/user/user.service";
import {UserRole} from "../../../enums/roles";
import {IProject} from "../../../models/project";

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.sass']
})
export class AddMemberDialogComponent {
  addMemberForm: FormGroup;
  userRoles = UserRole;
  usersInProject: string[];

  constructor(public dialogRef: MatDialogRef<AddMemberDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string[], private formBuilder: FormBuilder, private userService: UserService) {
    this.usersInProject = data;

    this.addMemberForm = this.formBuilder.group({
      email: '',
      name: '',
      role: '',
    });
  }

  async checkUser(event: any): Promise<void> {
    if(this.usersInProject.includes(event.target.value)) {
      this.addMemberForm.controls['email'].setErrors({'duplicateUser': true});
      return;
    }

    if (await this.userService.userExists(event.target.value))
      this.addMemberForm.controls['email'].setErrors(null);
    else
      this.addMemberForm.controls['email'].setErrors({'notFound': true});
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
