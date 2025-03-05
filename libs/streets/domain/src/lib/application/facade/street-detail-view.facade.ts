import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { IResponseStreet, SafetyMetricsDto } from '@simra/streets-common';
import { Observable, take, tap } from 'rxjs';
import { MapillaryRequestService } from '../../infrastructure/mapillary-request.service';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';
import { StreetsRequestService } from '../../infrastructure/streets-request.service';
import { SetSelectedSafetyMetrics, SetStreet } from '../store/street-detail.actions';
import { StreetDetailState } from '../store/street-detail.state';

@Injectable({
	  providedIn: 'root'
})
export class StreetDetailViewFacade {
	private readonly _streetsRequestService = inject(StreetsRequestService);
	private readonly _safetyMetricsRequestService = inject(SafetyMetricsRequestService);
	private readonly _mapillaryRequestService = inject(MapillaryRequestService);

	private readonly _store = inject(Store);

	private readonly _street = this._store.selectSignal(StreetDetailState.getStreet);

	getAndSetStreet(streetId: number) {
		const street = this._street();
		if (street && +streetId === +(street?.id)) {
			return;
		}

		this._store.dispatch(new SetStreet({ id: streetId } as IResponseStreet));

		return this._streetsRequestService.getStreet(streetId).pipe(
			take(1),
			tap((streets) => {
				this._store.dispatch(new SetStreet(streets));
			})
		);
	}

	public fetchSafetyMetricsForStreet(streetId: number): Observable<SafetyMetricsDto> {
		return this._safetyMetricsRequestService.getSafetyMetricsForStreet(streetId).pipe(
			take(1),
			tap((response: SafetyMetricsDto) => {
				this._store.dispatch(new SetSelectedSafetyMetrics(response));
			})
		);
	}

	public getIdOfNearestImage(lat: number, lng: number): Observable<number> {
		return this._mapillaryRequestService.getIdOfNearestImage(lat, lng);
	}
}
