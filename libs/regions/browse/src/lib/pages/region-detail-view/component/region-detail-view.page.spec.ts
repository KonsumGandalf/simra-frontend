import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegionDetailViewFacade } from '@simra/regions-domain';
import { of } from 'rxjs';
import { RegionDetailViewPage } from './region-detail-view.page';

describe('RegionDetailsPageComponent', () => {
	let component: RegionDetailViewPage;
	let fixture: ComponentFixture<RegionDetailViewPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RegionDetailViewPage],
			providers: [
				{
					provide: RegionDetailViewFacade,
					useValue: {
						getRegionSafetyMetrics: jest.fn().mockReturnValue(of([])),
					},
				}
			],
		}).compileComponents();

		fixture = TestBed.createComponent(RegionDetailViewPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
