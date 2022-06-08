import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/user/user.service";
import {UserRole} from "../../../enums/roles";

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.sass']
})
export class AddMemberDialogComponent {
  addMemberForm: FormGroup;
  userRoles = UserRole;

  constructor(public dialogRef: MatDialogRef<AddMemberDialogComponent>, private formBuilder: FormBuilder, private userService: UserService) {
    this.addMemberForm = this.formBuilder.group({
      email: '',
      name: '',
      role: '',
    });
  }

  async checkUser(event: any): Promise<void> {
    if (await this.userService.userExists(event.target.value))
      this.addMemberForm.controls['email'].setErrors(null);
    else
      this.addMemberForm.controls['email'].setErrors({'notFound': true});
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
