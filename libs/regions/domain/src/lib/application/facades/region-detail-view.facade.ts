import { inject, Injectable } from '@angular/core';
import { MethodRunService } from '@simra/common-domain';
import { RegionRequestService } from '../../infrastructure/region-request.service';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';

@Injectable({
  providedIn: 'root'
})
export class RegionDetailViewFacade {
    private readonly _safeMetricsRequestService = inject(SafetyMetricsRequestService);
    private readonly _regionRequestService = inject(RegionRequestService);
    private readonly _methodRunService = inject(MethodRunService);

    public getRegionSafetyMetrics(regionName: string){
        return this._safeMetricsRequestService.getRegionSafetyMetrics(regionName);
    }

    public getDetailedRegion(regionName: string){
        return this._regionRequestService.getDetailedRegion(regionName);
    }

    public getLastMethodRun(methodName: string) {
        return this._methodRunService.getDateOfLastMethodRun(methodName);
    }
}
