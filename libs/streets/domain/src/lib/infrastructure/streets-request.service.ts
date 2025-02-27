import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
	IGetStreetGrid, IResponseStreet,
} from '@simra/streets-common';
import { plainToInstance } from 'class-transformer';
import { isUndefined, omitBy } from 'lodash';
import { map, Observable } from 'rxjs';
import { StreetInformationDto } from '../models/dtos/street-information.dto';
import { StreetRideEntitiesResponseDto } from '../models/dtos/street-ride-entities-response.dto';
import { TRideTime } from '../models/interfaces/ride-time.type';

/**
 * Service to fetch street information for the '/api/streets' endpoint
 */
@Injectable({ providedIn: 'root' })
export class StreetsRequestService {
	private readonly _http = inject(HttpClient);

	public getStreetGrid(requestParams: IGetStreetGrid): Observable<StreetInformationDto[]> {
		return this._http.get<StreetInformationDto[]>('/api/streets/grid', { params: { ...omitBy(requestParams, isUndefined) } }).pipe(
			map((response) => plainToInstance(StreetInformationDto, response)),
		);
	}

	public getStreet(streetId: number): Observable<IResponseStreet> {
		return this._http.get<IResponseStreet>(`/api/streets/${streetId}`);
	}

	public getStreetRideEntities(streetId: number, requestParams: TRideTime): Observable<TRideTime[]> {
		const params = {
			...requestParams,
			rideStart: requestParams.rideStart.toISOString(),
			rideEnd: requestParams.rideEnd.toISOString(),
		}
		return this._http
			.get<StreetRideEntitiesResponseDto>(`/api/streets/${streetId}/ride-entities`, { params })
			.pipe(
				map((response) => {
					return plainToInstance(StreetRideEntitiesResponseDto, response).rides
				}),
			);
	}
}
