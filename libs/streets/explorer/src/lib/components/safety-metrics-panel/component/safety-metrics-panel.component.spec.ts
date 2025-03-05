import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngxs/store';
import { StreetDetailState, StreetDetailViewFacade } from '@simra/streets-domain';
import { SafetyMetricsService } from '../../../services/safety-metrics.service';
import { SafetyMetricsCardComponent } from '../../safety-metrics-card/component/safety-metrics-card.component';
import { SafetyMetricsPanelComponent } from './safety-metrics-panel.component';

describe('SafetyMetricsPanelComponent', () => {
	let component: SafetyMetricsPanelComponent;
	let fixture: ComponentFixture<SafetyMetricsPanelComponent>;

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
					provide: StreetDetailViewFacade,
					useValue: {
						fetchSafetyMetricsForStreet: jest.fn()
					}
				}
			]
		}).compileComponents();

		fixture = TestBed.createComponent(SafetyMetricsPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
