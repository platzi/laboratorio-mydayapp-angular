import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCounterComponent } from './task-counter.component';

describe('TaskCounterComponent', () => {
  let component: TaskCounterComponent;
  let fixture: ComponentFixture<TaskCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
