import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IIncident, IIncidentMarker } from '@simra/incidents-models';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { IncidentMarkerDTO } from '../models/dtos/incident-marker.dto';
import { IncidentsResponseDto } from '../models/dtos/incidents-response.dto';

@Injectable({ providedIn: 'root' })
export class IncidentRequestService {
	private readonly _http = inject(HttpClient);

	public getIncidents(): Observable<IIncidentMarker[]> {
		return this._http.get<IncidentsResponseDto>('/api/incidents/marker').pipe(
			map((response) => {
				const parsedResponse = JSON.parse(response.incidents);
				return parsedResponse.map((incident) => plainToInstance(IncidentMarkerDTO, incident, {
						enableImplicitConversion: true,
				}));
			}),
		);
	}

	public getIncidentDetails(id: number): Observable<IIncident> {
		return this._http.get<IIncident>(`/api/incidents/${id}`);
	}
}
