import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { RideManualDescriptionInterface } from '@simra/rides-common-models';
import { RideIncidentsResponseDto } from '../models/dtos/ride-incidents-response.dto';

@Injectable({ providedIn: 'root' })
export class IncidentRepository {
	private readonly _http = inject(HttpClient);

	public getIncidents(): Observable<RideManualDescriptionInterface[]> {
		const params = new HttpParams().set('size', '10000');

		return this._http.get('/api/rideIncidents', { params }).pipe(
			map(
				(response) =>
					plainToInstance(RideIncidentsResponseDto, response)._embedded
						.rideIncidents,
			),
		);
	}
}
