import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { APP_CONFIG, ISafetyMetricsRegion } from '@simra/common-models';
import { IRegion } from '@simra/models';
import { BaseRegionDetailViewComponent } from './base-region-detail-view.component';

@Component({
	selector: 'm-test-host-component',
	template: '<t-base-region-detail-view [detailedRegion]="detailedRegion" [safetyMetrics]="safetyMetrics" [lastRun]="lastRun"></t-base-region-detail-view>',
	imports: [BaseRegionDetailViewComponent],
})
class TestHostComponent {
	detailedRegion = undefined as IRegion;
	safetyMetrics = {} as ISafetyMetricsRegion;
	lastRun = new Date();
}
describe('Integration Test BaseRegionDetailViewComponent', () => {
	let component: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BaseRegionDetailViewComponent, TranslateModule.forRoot(), RouterModule.forRoot([])],
			providers: [
				{
					provide: APP_CONFIG,
					useValue: {
						mapTilerToken: '123'
					}
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
