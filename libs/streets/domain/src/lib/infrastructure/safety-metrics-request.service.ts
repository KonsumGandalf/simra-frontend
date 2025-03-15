import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPage } from '@simra/common-models';
import {
	SafetyMetricsDto,
	IStreetsSafetyMetricsRequest,
	IStreetsSafetyMetrics,
} from '@simra/streets-common';
import { plainToInstance } from 'class-transformer';
import { defaults, isEmpty, isNumber, omitBy, pickBy } from 'lodash';
import { map, Observable } from 'rxjs';

/**
 * Service to fetch safety metrics information for the '/api/safety-metrics' endpoint
 */
@Injectable({ providedIn: 'root' })
export class SafetyMetricsRequestService {
	private readonly _http = inject(HttpClient);

	public getSafetyMetricsForStreet(streetId: number): Observable<SafetyMetricsDto> {
		return this._http.get(`/api/safety-metrics/streets/${streetId}`).pipe(
			map((response) => plainToInstance(SafetyMetricsDto, response)),
		);
	}

	/**
	 * Fetches the list of streets with safety metrics
	 *
	 * @param requestParams - The request parameters
	 */
	public getStreetList(requestParams: IStreetsSafetyMetricsRequest): Observable<IPage<IStreetsSafetyMetrics>> {
		const params = defaults(pickBy(requestParams, isNumber), omitBy(requestParams, isEmpty));
		return this._http.get<IPage<IStreetsSafetyMetrics>>('/api/safety-metrics/streets', { params });
	}
}
