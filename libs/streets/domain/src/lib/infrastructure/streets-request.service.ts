import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
	GetStreetInformationInterface,
} from '@simra/streets-common';
import { plainToInstance } from 'class-transformer';
import { isUndefined, omitBy } from 'lodash';
import { map, Observable } from 'rxjs';
import { StreetInformationDto } from '../models/dtos/street-information.dto';

/**
 * Service to fetch street information for the '/api/streets' endpoint
 */
@Injectable({ providedIn: 'root' })
export class StreetsRequestService {
	private readonly _http = inject(HttpClient);

	public getStreetInformation(requestParams: GetStreetInformationInterface): Observable<StreetInformationDto[]> {
		return this._http.get<StreetInformationDto[]>('/api/streets/grid', { params: { ...omitBy(requestParams, isUndefined) } }).pipe(
			map((response) => plainToInstance(StreetInformationDto, response)),
		);
	}
}
