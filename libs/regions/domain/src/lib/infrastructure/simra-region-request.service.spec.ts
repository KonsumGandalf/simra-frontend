import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SimraRegionRequestService } from './simra-region-request.service';

describe('SimraRegionRequestService', () => {
  let service: SimraRegionRequestService;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockHttpClient = {
      get: jest.fn(),
    } as unknown as HttpClient;

    TestBed.configureTestingModule({
      providers: [ { provide: HttpClient, useValue: mockHttpClient } ]
    });
    service = TestBed.inject(SimraRegionRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
