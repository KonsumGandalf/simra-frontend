import { inject, Injectable } from '@angular/core';
import { ISafetyMetricsRequest } from '@simra/streets-common';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';

@Injectable({
  providedIn: 'root'
})
export class RegionListViewFacade {
  private readonly _safeMetricsRequestService = inject(SafetyMetricsRequestService);

  public getRegionListSafetyMetrics(requestParams: ISafetyMetricsRequest){
    return this._safeMetricsRequestService.getRegionList(requestParams);
  }
}
