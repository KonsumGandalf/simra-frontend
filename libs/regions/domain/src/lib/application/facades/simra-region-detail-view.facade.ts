import { inject, Injectable } from '@angular/core';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';
import { SimraRegionRequestService } from '../../infrastructure/simra-region-request.service';

@Injectable({
  providedIn: 'root'
})
export class SimraRegionDetailViewFacade {
    private readonly _safeMetricsRequestService = inject(SafetyMetricsRequestService);
    private readonly _regionRequestService = inject(SimraRegionRequestService);

    public getSimraRegionSafetyMetrics(regionName: string){
        return this._safeMetricsRequestService.getSimraRegionSafetyMetrics(regionName);
    }

    public getSimraDetailedRegion(regionName: string){
        return this._regionRequestService.getDetailedRegion(regionName);
    }
}
