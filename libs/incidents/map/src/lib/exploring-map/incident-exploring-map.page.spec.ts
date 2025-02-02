import 'reflect-metadata';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngxs/store';
import { MapFilterState } from '@simra/common-state';
import { ExploringMapFacade } from '@simra/incidents-domain';
import { of } from 'rxjs';
import { IncidentExploringMapPage } from './incident-exploring-map.page';

describe('IncidentExploringMapPage', () => {
	let component: IncidentExploringMapPage;
	let fixture: ComponentFixture<IncidentExploringMapPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [IncidentExploringMapPage, TranslateModule.forRoot()],
			providers: [
				{
					provide: ExploringMapFacade,
					useValue: {
						getIncidents: jest.fn().mockReturnValue(of([])),
					},
				},
				provideStore([MapFilterState]),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(IncidentExploringMapPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
