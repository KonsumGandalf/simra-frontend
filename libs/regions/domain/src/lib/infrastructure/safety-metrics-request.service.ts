import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPage } from '@simra/common-models';
import { ISafetyMetricsRegion } from '@simra/regions-common';
import { ISafetyMetricsRequest, ISafetyMetrics } from '@simra/streets-common';
import { plainToInstance } from 'class-transformer';
import { defaults, isEmpty, isNumber, omitBy, pickBy } from 'lodash';
import { map, Observable } from 'rxjs';
import { SafetyMetricsRegionDto } from '../models/dtos/safety-metrics-region.dto';

@Injectable({
  providedIn: 'root'
})
export class SafetyMetricsRequestService {
    private readonly _http = inject(HttpClient);

    public getRegionSafetyMetrics(regionName: string): Observable<ISafetyMetricsRegion[]>{
        return this._http.get<ISafetyMetricsRegion[]>(`/api/safety-metrics/regions/${regionName}`).pipe(
            map((data) => plainToInstance(SafetyMetricsRegionDto, data, { enableImplicitConversion: true }))
        );
    }

    public getRegionList(requestParams: ISafetyMetricsRequest): Observable<IPage<ISafetyMetrics>>{
        const params = defaults(pickBy(requestParams, isNumber), omitBy(requestParams, isEmpty));
        return this._http.get<IPage<ISafetyMetrics>>('/api/safety-metrics/regions', { params });
    }

    public getSimraRegionList(requestParams: ISafetyMetricsRequest): Observable<IPage<ISafetyMetrics>>{
        const params = defaults(pickBy(requestParams, isNumber), omitBy(requestParams, isEmpty));
        return this._http.get<IPage<ISafetyMetrics>>('/api/safety-metrics/simra-regions', { params });
    }

    public getSimraRegionSafetyMetrics(regionName: string): Observable<ISafetyMetricsRegion[]>{
        return this._http.get<ISafetyMetricsRegion[]>(`/api/safety-metrics/simra-regions/${regionName}`).pipe(
            map((data) => plainToInstance(SafetyMetricsRegionDto, data, { enableImplicitConversion: true }))
        );
    }
}
