import 'reflect-metadata';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StreetsExploringMapFacade } from '@simra/streets-domain';
import { polyline } from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { StreetsExploringMapPage } from './streets-exploring-map-page.component';

describe('ExploringMapComponent', () => {
	let component: StreetsExploringMapPage;
	let fixture: ComponentFixture<StreetsExploringMapPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StreetsExploringMapPage],
			providers: [
				{
					provide: StreetsExploringMapFacade,
					useValue: {
						getStreetInformation: jest.fn().mockReturnValue(new BehaviorSubject([
							polyline([[0, 0], [1, 1]]),
						])),
					}
				}
			]
		}).compileComponents();

		fixture = TestBed.createComponent(StreetsExploringMapPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
