import { TestBed } from '@angular/core/testing';
import { MethodRunService } from '@simra/common-domain';
import { ISimraRegion } from '@simra/models';
import { of } from 'rxjs';
import { RegionRequestService } from '../../infrastructure/region-request.service';
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
						getRegionSafetyMetrics: jest.fn().mockReturnValue(of([])),
					},
				},
				{
					provide: RegionRequestService,
					useValue: {
						getDetailedRegion: jest.fn().mockReturnValue(of({} as ISimraRegion)),
					},
				},
				{
					provide: MethodRunService,
					useValue: {
						getDateOfLastMethodRun: jest.fn().mockReturnValue(new Date()),
					},
				},
			],
		});
		service = TestBed.inject(RegionDetailViewFacade);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
