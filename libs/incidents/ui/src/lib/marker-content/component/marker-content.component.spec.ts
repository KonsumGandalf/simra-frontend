import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import {
	EBikeType,
	EIncidentType,
	EPhoneLocations,
	IIncident,
} from '@simra/incidents-models';
import { MarkerContentComponent } from './marker-content.component';

describe('MarkerContentComponent', () => {
	let component: MarkerContentComponent;
	let fixture: ComponentFixture<MarkerContentComponent>;
	let incident: IIncident;

	beforeEach(async () => {
		incident = {
			id: 1,
			lat: 1,
			lng: 1,
			timeStamp: new Date(),
			bike: EBikeType.MOUNTAIN_BIKE,
			description: 'Test incident',
			incidentType: EIncidentType.OTHER,
			phoneLocation: EPhoneLocations.BACKPACK_BAG,
			participantsInvolved: [],
			scary: false,
		} as IIncident;

		await TestBed.configureTestingModule({
			imports: [MarkerContentComponent, TranslateModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(MarkerContentComponent);
		component = fixture.componentInstance;
		component.incident = incident;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
