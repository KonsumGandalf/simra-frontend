import 'reflect-metadata';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngxs/store';
import { MapFilterState } from '@simra/common-state';
import { StreetMapState, StreetsExploringMapFacade } from '@simra/streets-domain';
import { polyline } from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { StreetsExploringMapPage } from './streets-exploring-map.page';

describe('StreetsExploringMapPage', () => {
	let component: StreetsExploringMapPage;
	let fixture: ComponentFixture<StreetsExploringMapPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StreetsExploringMapPage, TranslateModule.forRoot()],
			providers: [
				provideRouter([]),
				{
					provide: StreetsExploringMapFacade,
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
				provideStore([StreetMapState, MapFilterState]),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(StreetsExploringMapPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
