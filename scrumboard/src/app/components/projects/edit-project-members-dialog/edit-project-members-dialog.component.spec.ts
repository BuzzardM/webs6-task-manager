import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectMembersDialogComponent } from './edit-project-members-dialog.component';

describe('EditProjectMembersDialogComponent', () => {
  let component: EditProjectMembersDialogComponent;
  let fixture: ComponentFixture<EditProjectMembersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProjectMembersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectMembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
