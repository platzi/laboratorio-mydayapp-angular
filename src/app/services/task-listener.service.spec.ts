import { TestBed } from '@angular/core/testing';

import { TaskListenerService } from './task-listener.service';

describe('TaskListenerService', () => {
  let service: TaskListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
