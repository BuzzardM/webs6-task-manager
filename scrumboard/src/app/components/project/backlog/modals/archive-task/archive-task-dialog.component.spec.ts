import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveTaskDialogComponent } from './archive-task-dialog.component';

describe('ArchiveTaskComponent', () => {
  let component: ArchiveTaskDialogComponent;
  let fixture: ComponentFixture<ArchiveTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveTaskDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
