import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IProjectMember} from "../../../models/projectMember";
import {UserRole} from "../../../enums/roles";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-project-members-dialog',
  templateUrl: './edit-project-members-dialog.component.html',
  styleUrls: ['./edit-project-members-dialog.component.sass']
})
export class EditProjectMembersDialogComponent {
  editProjectMembersForm: FormGroup;
  projectMembers: IProjectMember[];
  selectedMemberIndex: number | undefined;
  userRoles = UserRole;

  constructor(private cdref: ChangeDetectorRef, public dialogRef: MatDialogRef<EditProjectMembersDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IProjectMember[], private formBuilder: FormBuilder) {
    this.projectMembers = data;

    this.editProjectMembersForm = this.formBuilder.group({
      member: '',
      email: '',
      name: '',
      role: ''
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectMember(value: any) {
    this.selectedMemberIndex = this.projectMembers.findIndex((u => {
      return u.email == value;
    }));

    this.editProjectMembersForm.patchValue({
      name: this.projectMembers[this.selectedMemberIndex]?.name,
      role: this.projectMembers[this.selectedMemberIndex]?.role,
      email: this.projectMembers[this.selectedMemberIndex]?.email
    })

    this.cdref.detectChanges();
  }

  saveValue() {
    let value = this.editProjectMembersForm.value;
    delete value.member;
    this.projectMembers[this.selectedMemberIndex!] = value;
  }
}
