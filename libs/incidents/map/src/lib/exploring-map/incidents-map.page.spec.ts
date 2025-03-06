import 'reflect-metadata';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngxs/store';
import { MapFilterState } from '@simra/common-state';
import { IncidentsMapFacade, IncidentsState } from '@simra/incidents-domain';
import { of } from 'rxjs';
import { IncidentsMapPage } from './incidents-map.page';

describe('IncidentExploringMapPage', () => {
	let component: IncidentsMapPage;
	let fixture: ComponentFixture<IncidentsMapPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [IncidentsMapPage, TranslateModule.forRoot()],
			providers: [
				provideRouter([]),
				provideStore([MapFilterState, IncidentsState]),
				{
					provide: IncidentsMapFacade,
					useValue: {
						getIncidents: jest.fn().mockReturnValue(of([])),
						getIncidentMarker: jest.fn().mockReturnValue(of([])),
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(IncidentsMapPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
