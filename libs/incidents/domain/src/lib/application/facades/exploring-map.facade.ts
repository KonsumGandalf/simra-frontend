import { inject, Injectable } from '@angular/core';
import { IIncident, IncidentMarkerInterface } from '@simra/incidents-models';
import { Observable } from 'rxjs';
import { IncidentRequestService } from '../../infrastructure/incident-request.service';

@Injectable({ providedIn: 'root' })
export class ExploringMapFacade {
	private readonly _incidentRepository = inject(IncidentRequestService);

	public getIncidents(): Observable<IncidentMarkerInterface[]> {
		return this._incidentRepository.getIncidents();
	}

	public getIncidentDetails(id: number): Observable<IIncident> {
		return this._incidentRepository.getIncidentDetails(id);
	}
}
