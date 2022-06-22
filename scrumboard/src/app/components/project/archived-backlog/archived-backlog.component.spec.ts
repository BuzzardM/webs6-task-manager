import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedBacklogComponent } from './archived-backlog.component';

describe('ArchivedBacklogComponent', () => {
  let component: ArchivedBacklogComponent;
  let fixture: ComponentFixture<ArchivedBacklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedBacklogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
