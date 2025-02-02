import 'reflect-metadata';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngxs/store';
import { MapFilterState } from '@simra/common-state';
import { StreetMapState, StreetsExploringMapFacade } from '@simra/streets-domain';
import { polyline } from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { RidesExploringMapPage } from './rides-exploring-map.page';

describe('StreetsExploringMapPage', () => {
	let component: RidesExploringMapPage;
	let fixture: ComponentFixture<RidesExploringMapPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RidesExploringMapPage,

				TranslateModule.forRoot()
			],
			providers: [
				{
					provide: StreetsExploringMapFacade,
					useValue: {
						fetchStreetInformation: jest.fn().mockReturnValue(new BehaviorSubject([
							polyline([[0, 0], [1, 1]]),
						])),
					}
				},
				provideStore([StreetMapState, MapFilterState]),
			]
		}).compileComponents();

		fixture = TestBed.createComponent(RidesExploringMapPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
