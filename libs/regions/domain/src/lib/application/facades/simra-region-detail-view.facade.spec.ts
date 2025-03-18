import { TestBed } from '@angular/core/testing';
import { GroupAssociationRequestService } from '../../infrastructure/group-association-request.service';
import { SimraRegionDetailViewFacade } from './simra-region-detail-view.facade';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';
import { SimraRegionRequestService } from '../../infrastructure/simra-region-request.service';


describe('SimraRegionDetailViewFacade', () => {
  let service: SimraRegionDetailViewFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          {
            provide: SafetyMetricsRequestService,
            useValue: {
              getRegionSafetyMetrics: jest.fn().mockReturnValue([])
            }
          },
          {
            provide: SimraRegionRequestService,
            useValue: {
              getDetailedRegion: jest.fn().mockReturnValue({})
            },
          },
          {
            provide: GroupAssociationRequestService,
            useValue: {
              getGroupAssociation: jest.fn().mockReturnValue([])
            }
          }
        ]
    });
    service = TestBed.inject(SimraRegionDetailViewFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
