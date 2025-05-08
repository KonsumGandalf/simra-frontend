import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MapFilterOptionsInterface } from '@simra/common-models';
import { IIncident } from '@simra/incidents-models';
import { plainToInstance } from 'class-transformer';
import { defaults, isEmpty, isNumber, omitBy, pickBy } from 'lodash';
import { map, Observable } from 'rxjs';
import { StreetIncidentsDto } from '../models/dtos/street-incidents.dto';

/**
 * Service to fetch incidents for the streets domain to the '/api/incidents' endpoint
 */
@Injectable({ providedIn: 'root' })
export class IncidentsRequestService {
	private readonly _http = inject(HttpClient);

	public getIncidentForStreet(streetId: number, filter: MapFilterOptionsInterface): Observable<IIncident[]> {
		const params = defaults(pickBy(filter, isNumber), omitBy(filter, isEmpty));
		return this._http.get(`/api/incidents/street/${streetId}`, { params }).pipe(
			map((response) => {
				return plainToInstance(StreetIncidentsDto, response).incidents;
			}),
		);
	}
}
