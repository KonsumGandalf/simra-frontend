import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { MethodRunService } from '@simra/common-domain';
import { IIncident } from '@simra/incidents-models';
import { IGetStreetGrid, SafetyMetricsDto } from '@simra/streets-common';
import { Geometry } from 'geojson';
import { GeoJSON } from 'leaflet';
import { firstValueFrom, Observable, take, tap } from 'rxjs';
import { IncidentsRequestService } from '../../infrastructure/incidents-request.service';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';
import { StreetsRequestService } from '../../infrastructure/streets-request.service';
import { StreetInformationDto } from '../../models/dtos/street-information.dto';
import * as L from 'leaflet';
import { SetSelectedSafetyMetrics, SetStreet } from '../store/street-detail.actions';
import { AddToStreetCache } from '../store/street-map.actions';

@Injectable({ providedIn: 'root' })
export class StreetsMapFacade {
	private readonly _streetsRequestService = inject(StreetsRequestService);
	private readonly _incidentRequestService = inject(IncidentsRequestService);
	private readonly _safetyMetricsRequestService = inject(SafetyMetricsRequestService);
	private readonly _methodRunService = inject(MethodRunService);
	private readonly _store = inject(Store);

	private toGeoJSON(street: StreetInformationDto): GeoJSON<any, Geometry> {
		return L.geoJSON(JSON.parse(`${street.way}`), {
			style: {
				color: street.dangerousColor,
				weight: 2.5,
			},
			onEachFeature: (feature, layer) => {
				// @TODO is click or hover better?
				layer.on('click', () => {
					this._store.dispatch(new SetStreet({ id: street.osm_id } as any));
				});
			}
		});
	}

	public async fetchStreetInformation(requestParams: IGetStreetGrid): Promise<void> {
		await firstValueFrom(
			this._streetsRequestService.getStreetGrid(requestParams).pipe(
				take(1),
				tap((response: StreetInformationDto[]) => {
					const batch: GeoJSON<any, Geometry>[] = [];
					for (const streetInformation of response) {
						batch.push(this.toGeoJSON(streetInformation));
					}
					this._store.dispatch(new AddToStreetCache(batch));
				})
			)
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


	public fetchIncidentsForStreet(streetId: number): Observable<IIncident[]> {
		return this._incidentRequestService.getIncidentForStreet(streetId)
	}

	public fetchLastMethodRun(methodName: string) {
		return this._methodRunService.getDateOfLastMethodRun(methodName);
	}
}
