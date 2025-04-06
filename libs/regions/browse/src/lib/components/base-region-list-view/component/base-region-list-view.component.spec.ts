import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { IPage } from '@simra/common-models';
import { ISafetyMetrics } from '@simra/streets-common';
import { StreetDetailViewFacade } from '@simra/streets-domain';
import { of } from 'rxjs';
import { BaseRegionListViewComponent } from './base-region-list-view.component';

@Component({
	selector: 'm-test-host-component',
	template: '<t-base-region-list-view [safetyMetrics]="safetyMetrics" [lastRun]="lastRun"></t-base-region-list-view>',
	imports: [BaseRegionListViewComponent],
})
class TestHostComponent {
	safetyMetrics = {} as IPage<ISafetyMetrics>;
	lastRun = new Date();
}
describe('Integration Test BaseRegionListViewComponent', () => {
	let component: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BaseRegionListViewComponent, TranslateModule.forRoot()],
			providers: [
				{
					provide: StreetDetailViewFacade,
					useValue: {
						fetchLastMethodRun: jest.fn().mockReturnValue(of(new Date())),
					}
				}
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
