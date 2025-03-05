import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { APP_CONFIG } from '@simra/common-models';
import { StreetDetailViewFacade } from '@simra/streets-domain';
import { of } from 'rxjs';
import { MapillaryComponent } from './mapillary.component';

describe('MapillarComponent', () => {
	let component: MapillaryComponent;
	let fixture: ComponentFixture<MapillaryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MapillaryComponent],
			providers: [
				{
					provide: StreetDetailViewFacade,
					useValue: {
						getIdOfNearestImage: jest.fn()
					}
				},
				{
					provide: ActivatedRoute,
					useValue: {
						queryParams: of({})
					}
				},
				{
					provide: APP_CONFIG,
					useValue: {
						mapillaryAccessToken: '123'
					}
				}
			]
		}).compileComponents();

		fixture = TestBed.createComponent(MapillaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
