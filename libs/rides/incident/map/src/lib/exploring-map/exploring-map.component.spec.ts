import 'reflect-metadata';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExecutingMapFacade } from '@simra/rides-incident-domain';
import { from, of } from 'rxjs';
import { ExploringMapComponent } from './exploring-map.component';

describe('ExploringMapComponent', () => {
	let component: ExploringMapComponent;
	let fixture: ComponentFixture<ExploringMapComponent>;
	let executingMapFacade: ExecutingMapFacade;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ExploringMapComponent],
			providers: [
				{
					provide: ExecutingMapFacade,
					useValue: {
						getIncidents: jest.fn().mockReturnValue(of([])),
					},
				}
				],
		}).compileComponents();

		fixture = TestBed.createComponent(ExploringMapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
