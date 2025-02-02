import 'reflect-metadata';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RidesExploringFacade } from '@simra/rides-domain';
import { polyline } from 'leaflet';
import { of } from 'rxjs';
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
					provide: RidesExploringFacade,
					useValue: {
						getRideGeometries: jest.fn().mockReturnValue(of([
							polyline([[0, 0], [1, 1]]),
						])),
					}
				},
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
