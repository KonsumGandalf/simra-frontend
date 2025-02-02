import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RidesRequestService } from './rides-request.service';

describe('RidesRequestService', () => {
  let service: RidesRequestService;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockHttpClient = {
      get: jest.fn().mockReturnValue(of({})),
    } as unknown as HttpClient;

    TestBed.configureTestingModule({
      providers: [{
        provide: HttpClient,
        useValue: mockHttpClient
      }]
    });
    service = TestBed.inject(RidesRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRideGeometries', () => {
    it('should call getRideGeometries', () => {
      service.getRideGeometries(1);
      expect(mockHttpClient.get).toHaveBeenCalled();
    });
  });
});
