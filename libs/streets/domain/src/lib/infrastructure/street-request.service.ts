import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IncidentInterface } from '@simra/incidents-models';
import { GetStreetInformationInterface, SafetyMetricsDto } from '@simra/streets-common';
import { plainToInstance } from 'class-transformer';
import { isUndefined, omitBy } from 'lodash';
import { map, Observable } from 'rxjs';
import { StreetIncidentsDto } from '../models/dtos/street-incidents.dto';
import { StreetInformationDto } from '../models/dtos/street-information.dto';

@Injectable({ providedIn: 'root' })
export class StreetRequestService {
	private readonly _http = inject(HttpClient);

	public getStreetInformation(requestParams: GetStreetInformationInterface): Observable<StreetInformationDto[]> {
		return this._http.get<StreetInformationDto[]>('/api/streets', { params: { ...omitBy(requestParams, isUndefined) } }).pipe(
			map((response) => plainToInstance(StreetInformationDto, response)),
		);
	}

	public getSafetyMetricsForStreet(streetId: number): Observable<SafetyMetricsDto> {
		return this._http.get<StreetInformationDto>(`/api/safety-metrics/streets/${streetId}`).pipe(
			map((response) => plainToInstance(SafetyMetricsDto, response)),
		);
	}

	public getIncidentForStreet(streetId: number): Observable<IncidentInterface[]> {
		return this._http.get(`/api/incidents/street/${streetId}`).pipe(
			map((response) => {
				return plainToInstance(StreetIncidentsDto, response).incidents;
			})
		);
	}
}
