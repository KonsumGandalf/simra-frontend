import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IncidentInterface } from '@simra/incidents-models';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { StreetIncidentsDto } from '../models/dtos/street-incidents.dto';

/**
 * Service to fetch incidents for the streets domain to the '/api/incidents' endpoint
 */
@Injectable({ providedIn: 'root' })
export class IncidentsRequestService {
	private readonly _http = inject(HttpClient);

	public getIncidentForStreet(streetId: number): Observable<IncidentInterface[]> {
		return this._http.get(`/api/incidents/street/${streetId}`).pipe(
			map((response) => {
				return plainToInstance(StreetIncidentsDto, response).incidents;
			})
		);
	}
}
