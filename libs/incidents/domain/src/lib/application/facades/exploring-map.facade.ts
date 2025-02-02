import { inject, Injectable } from '@angular/core';
import { IncidentInterface } from '@simra/incidents-models';
import { Observable } from 'rxjs';
import { IncidentRepository } from '../../infrastructure/incident.repository';

@Injectable({ providedIn: 'root' })
export class ExploringMapFacade {
	private readonly _incidentRepository = inject(IncidentRepository);

	public getIncidents(): Observable<IncidentInterface[]> {
		return this._incidentRepository.getIncidents();
	}
}
