import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RegionRequestService } from './region-request.service';

describe('RegionRequestService', () => {
  let service: RegionRequestService;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockHttpClient = {
      get: jest.fn(),
    } as unknown as HttpClient;

    TestBed.configureTestingModule({
      providers: [ { provide: HttpClient, useValue: mockHttpClient } ]
    });
    service = TestBed.inject(RegionRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
