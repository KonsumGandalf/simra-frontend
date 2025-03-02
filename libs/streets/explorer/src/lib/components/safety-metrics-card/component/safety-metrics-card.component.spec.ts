import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngxs/store';
import { StreetDetailState } from '@simra/streets-domain';
import { SafetyMetricsService } from '../../../services/safety-metrics.service';
import { StreetAnalyticsService } from '../../../services/street-analytics.service';
import { SafetyMetricsCardComponent } from './safety-metrics-card.component';

describe('SafetyMetricsCardComponent', () => {
	let component: SafetyMetricsCardComponent;
	let fixture: ComponentFixture<SafetyMetricsCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SafetyMetricsCardComponent, TranslateModule.forRoot()],
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
					provide: StreetAnalyticsService,
					useValue: {
						calculateSafetyMetrics: jest.fn(),
					}
				}
			]
		}).compileComponents();

		fixture = TestBed.createComponent(SafetyMetricsCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
