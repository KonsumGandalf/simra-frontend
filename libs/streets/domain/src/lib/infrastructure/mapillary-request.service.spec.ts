import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MapillaryRequestService } from './mapillary-request.service';

describe('MapillaryRequestService', () => {
  let service: MapillaryRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: { get: jest.fn() } }
      ]
    });
    service = TestBed.inject(MapillaryRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
