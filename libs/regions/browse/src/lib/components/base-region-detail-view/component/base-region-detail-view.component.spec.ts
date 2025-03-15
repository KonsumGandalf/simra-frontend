import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { IRegion, ISafetyMetricsRegion } from '@simra/models';
import { BaseRegionDetailViewComponent } from './base-region-detail-view.component';

@Component({
	selector: 'm-test-host-component',
	template: '<t-base-region-detail-view [detailedRegion]="detailedRegion" [safetyMetrics]="safetyMetrics"></t-base-region-detail-view>',
	imports: [BaseRegionDetailViewComponent],
})
class TestHostComponent {
	detailedRegion = undefined as IRegion;
	safetyMetrics = {} as ISafetyMetricsRegion;
}
describe('Integration Test BaseRegionDetailViewComponent', () => {
	let component: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BaseRegionDetailViewComponent, TranslateModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
