import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { MethodRunService } from '@simra/common-domain';
import { IIncident, IIncidentMarker } from '@simra/incidents-models';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { IncidentRequestService } from '../../infrastructure/incident-request.service';
import { SetIncidentMarker } from '../state/incidents.actions';
import { IncidentsState } from '../state/incidents.state';

@Injectable({ providedIn: 'root' })
export class IncidentsMapFacade {
	private readonly _incidentRepository = inject(IncidentRequestService);
	private readonly _lastMethodRun = inject(MethodRunService);
	private readonly _store = inject(Store);

	private readonly incidentMarkers = this._store.selectSignal(IncidentsState.getIncidentMarkers)
	private incidentRequest$?: Observable<IIncidentMarker[]>;

	public getIncidentMarker(): Observable<IIncidentMarker[]> {
		const incidentMarkersAlreadyInStore = this.incidentMarkers();
		if (incidentMarkersAlreadyInStore.length > 0) {
			return of(incidentMarkersAlreadyInStore);
		}

		if (!this.incidentRequest$) {
			this.incidentRequest$ = this._incidentRepository.getIncidents().pipe(
				tap((incidents) => {
					this._store.dispatch(new SetIncidentMarker(incidents));
				}),
				shareReplay(1)
			);
		}

		return this.incidentRequest$;
	}

	public getIncidentDetails(id: number): Observable<IIncident> {
		return this._incidentRepository.getIncidentDetails(id);
	}

	public fetchLastMethodRun(methodName: string) {
		return this._lastMethodRun.getDateOfLastMethodRun(methodName);
	}
}
