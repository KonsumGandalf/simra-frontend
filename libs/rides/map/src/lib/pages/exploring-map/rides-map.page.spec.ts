import 'reflect-metadata';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RidesFacade } from '@simra/rides-domain';
import { polyline } from 'leaflet';
import { of } from 'rxjs';
import { RidesMapPage } from './rides-map.page';

describe('StreetsExploringMapPage', () => {
	let component: RidesMapPage;
	let fixture: ComponentFixture<RidesMapPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RidesMapPage,

				TranslateModule.forRoot()
			],
			providers: [
				provideRouter([]),
				{
					provide: RidesFacade,
					useValue: {
						getRideGeometries: jest.fn().mockReturnValue(of([
							polyline([[0, 0], [1, 1]]),
						])),
					}
				},
			]
		}).compileComponents();

		fixture = TestBed.createComponent(RidesMapPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
