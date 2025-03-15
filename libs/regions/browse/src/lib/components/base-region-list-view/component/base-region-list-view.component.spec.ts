import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { IRegion } from '@simra/models';
import { BaseRegionListViewComponent } from './base-region-list-view.component';

@Component({
	selector: 'm-test-host-component',
	template: '<t-base-region-list-view [regions]="regions"></t-base-region-list-view>',
	imports: [BaseRegionListViewComponent],
})
class TestHostComponent {
	regions = [] as IRegion[];
}
describe('Integration Test BaseRegionListViewComponent', () => {
	let component: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BaseRegionListViewComponent, TranslateModule.forRoot()],
			providers: [],
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
