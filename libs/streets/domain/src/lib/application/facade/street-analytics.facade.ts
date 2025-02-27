import { inject, Injectable } from '@angular/core';
import { StreetsRequestService } from '../../infrastructure/streets-request.service';
import { TRideTime } from '../../models/interfaces/ride-time.type';

@Injectable({
	  providedIn: 'root'
})
export class StreetAnalyticsFacadeFacade {
	private readonly _streetsRequestService = inject(StreetsRequestService);

	getStreetRideEntities(streetId: number, params: TRideTime) {
		return this._streetsRequestService.getStreetRideEntities(streetId, params)
	}
}
