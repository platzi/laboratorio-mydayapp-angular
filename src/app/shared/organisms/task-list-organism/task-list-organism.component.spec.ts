import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListOrganismComponent } from './task-list-organism.component';

describe('TaskListOrganismComponent', () => {
  let component: TaskListOrganismComponent;
  let fixture: ComponentFixture<TaskListOrganismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListOrganismComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListOrganismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
