import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { MethodRunService } from '@simra/common-domain';
import { IResponseStreet } from '@simra/streets-common';
import { Observable, of, take, tap } from 'rxjs';
import { MapillaryRequestService } from '../../infrastructure/mapillary-request.service';
import { StreetsRequestService } from '../../infrastructure/streets-request.service';
import { SetStreet, SetStreetIdLoading } from '../store/street-detail.actions';
import { StreetDetailState } from '../store/street-detail.state';

@Injectable({
	  providedIn: 'root'
})
export class StreetDetailViewFacade {
	private readonly _streetsRequestService = inject(StreetsRequestService);
	private readonly _mapillaryRequestService = inject(MapillaryRequestService);
	private readonly _methodRunService = inject(MethodRunService);

	private readonly _store = inject(Store);

	getAndSetStreet(streetId: number) {
		const loadingId = this._store.selectSnapshot(StreetDetailState.getLoadingId);

		if (loadingId === +streetId) {
			const street = this._store.selectSnapshot(StreetDetailState.getStreet);

			if (street.id === streetId) {
				return of(street);
			}
			return of({ id: streetId } as IResponseStreet);
		}

		this._store.dispatch(new SetStreetIdLoading(streetId));

		return this._streetsRequestService.getStreet(streetId).pipe(
			take(1),
			tap((street) => {
				this._store.dispatch(new SetStreet(street));
			})
		);
	}

	public getIdOfNearestImage(lat: number, lng: number): Observable<number> {
		return this._mapillaryRequestService.getIdOfNearestImage(lat, lng);
	}

	public fetchLastMethodRun(methodName: string) {
		return this._methodRunService.getDateOfLastMethodRun(methodName);
	}
}
