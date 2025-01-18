import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SafetyMetricsPanelComponent } from './safety-metrics-panel.component';

describe('SafetyMetricsPanelComponent', () => {
	let component: SafetyMetricsPanelComponent;
	let fixture: ComponentFixture<SafetyMetricsPanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				SafetyMetricsPanelComponent,

				TranslateModule.forRoot()
			],
		}).compileComponents();

		fixture = TestBed.createComponent(SafetyMetricsPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
