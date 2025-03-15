import { inject, Injectable } from '@angular/core';
import { ISafetyMetricsRequest } from '@simra/streets-common';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';

@Injectable({
  providedIn: 'root'
})
export class SimraRegionListViewFacade {
  private readonly _safeMetricsRequestService = inject(SafetyMetricsRequestService);

  public getSimraRegionListSafetyMetrics(requestParams: ISafetyMetricsRequest){
    return this._safeMetricsRequestService.getSimraRegionList(requestParams);
  }
}
