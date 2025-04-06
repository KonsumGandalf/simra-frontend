import { inject, Injectable } from '@angular/core';
import { MethodRunService } from '@simra/common-domain';
import { ISafetyMetricsRequest } from '@simra/streets-common';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';

@Injectable({
  providedIn: 'root'
})
export class SimraRegionListViewFacade {
  private readonly _safeMetricsRequestService = inject(SafetyMetricsRequestService);
    private readonly _methodRunService = inject(MethodRunService);

  public getSimraRegionListSafetyMetrics(requestParams: ISafetyMetricsRequest){
    return this._safeMetricsRequestService.getSimraRegionList(requestParams);
  }

    public getLastRun(name: string){
        return this._methodRunService.getDateOfLastMethodRun(name);
    }
}
