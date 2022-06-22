import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreTaskDialogComponent } from './restore-task-dialog.component';

describe('RestoreTaskDialogComponent', () => {
  let component: RestoreTaskDialogComponent;
  let fixture: ComponentFixture<RestoreTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoreTaskDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
