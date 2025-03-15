import { inject, Injectable } from '@angular/core';
import { RegionRequestService } from '../../infrastructure/region-request.service';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';

@Injectable({
  providedIn: 'root'
})
export class RegionDetailViewFacade {
    private readonly _safeMetricsRequestService = inject(SafetyMetricsRequestService);
    private readonly _regionRequestService = inject(RegionRequestService);

    public getRegionSafetyMetrics(regionName: string){
        return this._safeMetricsRequestService.getRegionSafetyMetrics(regionName);
    }

    public getDetailedRegion(regionName: string){
        return this._regionRequestService.getDetailedRegion(regionName);
    }
}
