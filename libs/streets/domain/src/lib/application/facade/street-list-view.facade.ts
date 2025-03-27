import { inject, Injectable } from '@angular/core';
import { MethodRunService } from '@simra/common-domain';
import { IPage } from '@simra/common-models';
import { IStreetsSafetyMetrics, IStreetsSafetyMetricsRequest } from '@simra/streets-common';
import { Observable } from 'rxjs';
import { RegionRequestService } from '../../infrastructure/region-request.service';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';
import { StreetsRequestService } from '../../infrastructure/streets-request.service';

@Injectable({ providedIn: 'root' })
export class StreetListViewFacade {
	private readonly _safetyMetricsRequestService = inject(SafetyMetricsRequestService);
	private readonly _streetsRequestService = inject(StreetsRequestService);
	private readonly _regionRequestService = inject(RegionRequestService);
	private readonly _methodRunService = inject(MethodRunService);

	public fetchStreetList(safetyMetricsInterface: IStreetsSafetyMetricsRequest): Observable<IPage<IStreetsSafetyMetrics>> {
		return this._safetyMetricsRequestService.getStreetList(safetyMetricsInterface);
	}

	public fetchRegionNames(prefix: string): Observable<string[]> {
		return this._regionRequestService.fetchRegionNames(prefix);
	}

	public fetchStreetNames(prefix: string) {
		return this._streetsRequestService.getStreetNames(prefix);
	}

	public fetchStreetIds(prefix: string) {
		return this._streetsRequestService.getStreetIds(prefix);
	}
}
