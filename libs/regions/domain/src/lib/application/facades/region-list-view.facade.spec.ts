import { TestBed } from '@angular/core/testing';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';

import { RegionListViewFacade } from './region-list-view.facade';

describe('RegionListViewFacade', () => {
  let service: RegionListViewFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
            provide: SafetyMetricsRequestService,
            useValue: {
              getRegionList: jest.fn().mockReturnValue({}),
            },
        }
      ]
    });
    service = TestBed.inject(RegionListViewFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
