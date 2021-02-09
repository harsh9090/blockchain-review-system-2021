import { TestBed } from '@angular/core/testing';

import { ErrorServService } from './error-serv.service';

describe('ErrorServService', () => {
  let service: ErrorServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
