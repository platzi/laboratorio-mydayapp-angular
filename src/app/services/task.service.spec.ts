import { TestBed } from '@angular/core/testing';

import { Task.ServiceService } from './task.service.service';

describe('Task.ServiceService', () => {
  let service: Task.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Task.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
