import { inject, Injectable } from '@angular/core';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';

@Injectable({
  providedIn: 'root'
})
export class RegionDetailViewFacade {
    private readonly _safeMetricsRequestService = inject(SafetyMetricsRequestService);

    public getRegionSafetyMetrics(regionName: string){
        return this._safeMetricsRequestService.getRegionSafetyMetrics(regionName);
    }
}
