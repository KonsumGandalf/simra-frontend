import { inject, Injectable } from '@angular/core';
import { RideManualDescriptionInterface } from '@simra/rides-common-models';
import { Observable } from 'rxjs';
import { IncidentRepository } from '../../infrastructure/incident.repository';

@Injectable({ providedIn: 'root' })
export class ExecutingMapFacade {
	private readonly _incidentRepository = inject(IncidentRepository);

	public getIncidents(): Observable<RideManualDescriptionInterface[]> {
		return this._incidentRepository.getincidents();
	}
}
