import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SafetyMetricsRequestService } from './safety-metrics-request.service';

describe('SafetyMetricsRequestService', () => {
  let service: SafetyMetricsRequestService;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockHttpClient = {
		get: jest.fn(),
	} as unknown as HttpClient;
    
    TestBed.configureTestingModule({
      providers: [ { provide: HttpClient, useValue: mockHttpClient } ]
    });
    service = TestBed.inject(SafetyMetricsRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
