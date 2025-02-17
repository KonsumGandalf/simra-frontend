import { inject, Injectable } from '@angular/core';
import { IPage } from '@simra/common-models';
import { StreetsSafetyMetricsInterface, SafetyMetricsRequest } from '@simra/streets-common';
import { Observable } from 'rxjs';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';

@Injectable({ providedIn: 'root' })
export class StreetListViewFacade {
	private readonly _safetyMetricsRequestService = inject(SafetyMetricsRequestService);

	public fetchStreetList(safetyMetricsInterface: SafetyMetricsRequest): Observable<IPage<StreetsSafetyMetricsInterface>> {
		return this._safetyMetricsRequestService.getStreetList(safetyMetricsInterface);
	}
}
