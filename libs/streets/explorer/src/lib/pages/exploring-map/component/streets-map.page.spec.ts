import 'reflect-metadata';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngxs/store';
import { MapFilterState } from '@simra/common-state';
import { StreetDetailState, StreetDetailViewFacade, StreetMapState, StreetsMapFacade } from '@simra/streets-domain';
import { polyline } from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { StreetsMapPage } from './streets-map.page';

describe('StreetsExploringMapPage', () => {
	let component: StreetsMapPage;
	let fixture: ComponentFixture<StreetsMapPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StreetsMapPage, TranslateModule.forRoot()],
			providers: [
				provideRouter([]),
				{
					provide: StreetsMapFacade,
					useValue: {
						fetchStreetInformation: jest.fn().mockReturnValue(
							new BehaviorSubject([
								polyline([
									[0, 0],
									[1, 1],
								]),
							]),
						),
					},
				},
				{
					provide: StreetDetailViewFacade,
					useValue: {
						getIdOfNearestImage: jest.fn(),
					}
				},
				provideStore([StreetMapState, MapFilterState, StreetDetailState]),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(StreetsMapPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
