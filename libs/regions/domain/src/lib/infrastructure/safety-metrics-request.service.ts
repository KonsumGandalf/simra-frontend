import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ISafetyMetricsRegion } from '@simra/regions-models';

@Injectable({
  providedIn: 'root'
})
export class SafetyMetricsRequestService {
    private readonly _httpClient = inject(HttpClient);

    public getRegionSafetyMetrics(regionName: string){
        return this._httpClient.get<ISafetyMetricsRegion[]>(`/api/safety-metrics/region/${regionName}`);
    }
}
