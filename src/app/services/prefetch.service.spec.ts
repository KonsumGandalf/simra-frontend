import { TestBed } from '@angular/core/testing';
import { IncidentsMapFacade } from '@simra/incidents-domain';
import { StreetsMapFacade } from '@simra/streets-domain';
import { of } from 'rxjs';

import { PrefetchService } from './prefetch.service';

describe('PrefetchService', () => {
  let service: PrefetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          {
            provide: IncidentsMapFacade,
            useValue: {
              getIncidentMarkers: jest.fn().mockReturnValue(of({}))
            }
          },
          {
            provide: StreetsMapFacade,
            useValue: {
                fetchStreetInformation: jest.fn().mockReturnValue(of({}))
            }
          }
        ]
    });
    service = TestBed.inject(PrefetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
