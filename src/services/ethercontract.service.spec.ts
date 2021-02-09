import { TestBed } from '@angular/core/testing';

import { EthercontractService } from './ethercontract.service';

describe('EthercontractService', () => {
  let service: EthercontractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthercontractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
