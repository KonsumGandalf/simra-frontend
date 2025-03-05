import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { IIncident, IIncidentMarker } from '@simra/incidents-models';
import { Observable, tap } from 'rxjs';
import { IncidentRequestService } from '../../infrastructure/incident-request.service';
import { SetIncidentMarker } from '../state/incidents.actions';

@Injectable({ providedIn: 'root' })
export class IncidentsMapFacade {
	private readonly _incidentRepository = inject(IncidentRequestService);
	private readonly _store = inject(Store);

	public getIncidentMarker(): Observable<IIncidentMarker[]> {
		return this._incidentRepository.getIncidents().pipe(
			tap((incidents) => {
				this._store.dispatch(new SetIncidentMarker(incidents));
			})
		);
	}

	public getIncidentDetails(id: number): Observable<IIncident> {
		return this._incidentRepository.getIncidentDetails(id);
	}
}
