import { TestBed } from '@angular/core/testing';

import { EmitService } from './emit.service';

describe('EmitService', () => {
  let service: EmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
