import { TestBed } from '@angular/core/testing';

import { RidesRequestService } from './rides-request.service';

describe('RidesRequestService', () => {
  let service: RidesRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidesRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
