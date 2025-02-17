import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafetyMetricsDigitPanelComponent } from './safety-metrics-digit-panel.component';

describe('SafeMetricsDigitPanelComponent', () => {
	let component: SafetyMetricsDigitPanelComponent;
	let fixture: ComponentFixture<SafetyMetricsDigitPanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SafetyMetricsDigitPanelComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SafetyMetricsDigitPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
