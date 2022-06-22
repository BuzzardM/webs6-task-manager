import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetActiveDialogComponent } from './set-active-dialog.component';

describe('SetActiveDialogComponent', () => {
  let component: SetActiveDialogComponent;
  let fixture: ComponentFixture<SetActiveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetActiveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetActiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
