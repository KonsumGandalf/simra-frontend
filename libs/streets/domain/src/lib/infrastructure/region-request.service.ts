import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ISafetyMetricsRegion, MapFilterOptionsInterface } from '@simra/common-models';
import { IRegionMap } from '@simra/streets-common';
import { plainToInstance } from 'class-transformer';
import { defaults, find } from 'lodash';
import { map, Observable } from 'rxjs';
import { RegionMapDto } from '@simra/streets-common';

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

	public getRegionMap(): Observable<IRegionMap[]> {
		return this._httpClient.get<IRegionMap[]>('/assets/maplibre/region-map.json').pipe(
			map((response) => {
				return plainToInstance(RegionMapDto, response);
			}),
		);
	}
}
