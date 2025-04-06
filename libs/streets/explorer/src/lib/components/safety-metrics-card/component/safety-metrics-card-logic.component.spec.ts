import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngxs/store';
import { of } from 'rxjs';
import { SafetyMetricsCardLogicComponent } from './safety-metrics-card-logic.component';
import { StreetDetailState, StreetDetailViewFacade } from '@simra/streets-domain';
import { SafetyMetricsService } from '../../../services/safety-metrics.service';
import { StreetAnalyticsService } from '../../../services/street-analytics.service';

describe('SafetyMetricsCardLogicComponent', () => {
	let component: SafetyMetricsCardLogicComponent;
	let fixture: ComponentFixture<SafetyMetricsCardLogicComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				SafetyMetricsCardLogicComponent,
				TranslateModule.forRoot(),
				RouterModule.forRoot([])
			],
			providers: [
				provideStore([StreetDetailState]),
				{
					provide: SafetyMetricsService,
					useValue: {
						getPieMetricsIncidentTypesOptions: jest.fn(),
						pieMetricsIncidentTypesData$: jest.fn(),
						getBarMetricsRideIncidentDistributionOptions: jest.fn(),
						barMetricsRideIncidentDistributionData$: jest.fn(),
					}
				},
				{
					provide: StreetDetailViewFacade,
					useValue: {
						fetchLastMethodRun: jest.fn().mockReturnValue(of(new Date())),
					}
				},
				{
					provide: StreetAnalyticsService,
					useValue: {
						calculateSafetyMetrics: jest.fn(),
					}
				}
			]
		}).compileComponents();

		fixture = TestBed.createComponent(SafetyMetricsCardLogicComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
