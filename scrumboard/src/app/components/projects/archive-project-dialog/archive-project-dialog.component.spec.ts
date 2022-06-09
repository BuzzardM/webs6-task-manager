import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveProjectDialogComponent } from './archive-project-dialog.component';

describe('ArchiveProjectDialogComponent', () => {
  let component: ArchiveProjectDialogComponent;
  let fixture: ComponentFixture<ArchiveProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveProjectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
