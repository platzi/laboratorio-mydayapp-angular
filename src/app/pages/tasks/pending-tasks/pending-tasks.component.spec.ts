import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTasksComponent } from './pending-tasks.component';

describe('PendingTasksComponent', () => {
  let component: PendingTasksComponent;
  let fixture: ComponentFixture<PendingTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
