import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ISafetyMetricsRegion, MapFilterOptionsInterface } from '@simra/common-models';
import { defaults, find } from 'lodash';
import { map, Observable } from 'rxjs';

@Injectable({
	  providedIn: 'root'
})
export class RegionRequestService {
	private readonly _httpClient = inject(HttpClient);

	public fetchRegionNames(prefix: string) {
		return this._httpClient.get<string[]>(`/api/regions/name${prefix ? `/${prefix}` : ''}`);
	}

	public getRegionSafetyMetrics(regionName: string, filter: MapFilterOptionsInterface): Observable<ISafetyMetricsRegion>{
		return this._httpClient.get<ISafetyMetricsRegion[]>(`/api/safety-metrics/regions/${regionName}`).pipe(
			map((data) => {
				return find(data, defaults({ year: +filter.year }, filter));
			})
		);
	}
}
