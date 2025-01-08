import 'reflect-metadata';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ExploringMapFacade } from '@simra/rides-incident-domain';
import { of } from 'rxjs';
import { IncidentExploringMapPage } from './incident-exploring-map.page';

describe('ExploringMapPage', () => {
	let component: IncidentExploringMapPage;
	let fixture: ComponentFixture<IncidentExploringMapPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				IncidentExploringMapPage,

				TranslateModule.forRoot()
			],
			providers: [
				{
					provide: ExploringMapFacade,
					useValue: {
						getIncidents: jest.fn().mockReturnValue(of([])),
					},
				}
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
