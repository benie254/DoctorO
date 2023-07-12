import { TestBed } from '@angular/core/testing';

import { ReqHandlersService } from './req-handlers.service';

describe('ReqHandlersService', () => {
  let service: ReqHandlersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReqHandlersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
