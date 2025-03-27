import { TestBed } from '@angular/core/testing';
import { MethodRunService } from '@simra/common-domain';
import { ISimraRegion } from '@simra/models';
import { GroupAssociationRequestService } from '../../infrastructure/group-association-request.service';
import { SimraRegionRequestService } from '../../infrastructure/simra-region-request.service';
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
						getDateOfLastMethodRun: jest.fn().mockReturnValue([]),
					},
				},
				{
					provide: SimraRegionRequestService,
					useValue: {
						getDetailedRegion: jest.fn().mockReturnValue({} as ISimraRegion),
					},
				},
				{
					provide: GroupAssociationRequestService,
					useValue: {
						getGroupAssociation: jest.fn().mockReturnValue([]),
					},
				},
				{
					provide: MethodRunService,
					useValue: {
						getDateOfLastMethodRun: jest.fn().mockReturnValue(new Date()),
					},
				},
			]
		});
		service = TestBed.inject(SimraRegionListViewFacade);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
