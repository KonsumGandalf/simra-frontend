import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SafetyMetricsService } from '../services/safety-metrics.service';
import { SafetyMetricsCardComponent } from './safety-metrics-card.component';

describe('SafetyMetricsCardComponent', () => {
	let component: SafetyMetricsCardComponent;
	let fixture: ComponentFixture<SafetyMetricsCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SafetyMetricsCardComponent, TranslateModule.forRoot()],
			providers: [
				{
					provide: SafetyMetricsService,
					useValue: {
						getPieMetricsIncidentTypesOptions: jest.fn(),
						pieMetricsIncidentTypesData$: jest.fn(),
						getBarMetricsRideIncidentDistributionOptions: jest.fn(),
						barMetricsRideIncidentDistributionData$: jest.fn(),
					}
				},
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
