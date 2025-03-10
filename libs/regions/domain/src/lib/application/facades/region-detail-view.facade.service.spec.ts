import { TestBed } from '@angular/core/testing';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';

import { RegionDetailViewFacade } from './region-detail-view.facade';

describe('RegionDetailsFacade', () => {
  let service: RegionDetailViewFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          {
            provide: SafetyMetricsRequestService,
            useValue: {
              getRegionSafetyMetrics: jest.fn().mockReturnValue([])
            }
          }
        ]
    });
    service = TestBed.inject(RegionDetailViewFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
