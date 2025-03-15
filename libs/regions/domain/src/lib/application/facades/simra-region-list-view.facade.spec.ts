import { TestBed } from '@angular/core/testing';
import { SimraRegionListViewFacade } from './simra-region-list-view.facade';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';


describe('SimraRegionListViewFacade', () => {
  let service: SimraRegionListViewFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
            provide: SafetyMetricsRequestService,
            useValue: {
              getSimraRegionList: jest.fn().mockReturnValue({}),
            },
        }
      ]
    });
    service = TestBed.inject(SimraRegionListViewFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
