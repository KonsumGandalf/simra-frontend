import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { APP_CONFIG } from '@simra/common-models';
import { StreetDetailState, StreetDetailViewFacade } from '@simra/streets-domain';
import { of } from 'rxjs';
import { MapCarouselComponent } from './map-carousel.component';

describe('MapCarouselComponent', () => {
	let component: MapCarouselComponent;
	let fixture: ComponentFixture<MapCarouselComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MapCarouselComponent],
			providers: [
				provideRouter([]),
				provideStore([StreetDetailState]),

				{
					provide: ActivatedRoute,
					useValue: {
						queryParams: of({})
					},
				},
				{
					provide: StreetDetailViewFacade,
					useValue: {
						getIdOfNearestImage: jest.fn(),
					},
				},

				{
					provide: APP_CONFIG,
					useValue: {
						mapillaryAccessToken: 'test'
					}
				}
			],
		}).compileComponents();

		fixture = TestBed.createComponent(MapCarouselComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
