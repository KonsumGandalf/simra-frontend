import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { MethodRunService } from '@simra/common-domain';
import { ISafetyMetricsRegion, MapFilterOptionsInterface } from '@simra/common-models';
import { IIncident } from '@simra/incidents-models';
import { IGetStreetGrid, SafetyMetricsDto } from '@simra/streets-common';
import { Geometry } from 'geojson';
import { GeoJSON } from 'leaflet';
import { deepEquals } from 'nx/src/utils/json-diff';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap, take, tap } from 'rxjs';
import { IncidentsRequestService } from '../../infrastructure/incidents-request.service';
import { RegionRequestService } from '../../infrastructure/region-request.service';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';
import { StreetsRequestService } from '../../infrastructure/streets-request.service';
import { StreetInformationDto } from '../../models/dtos/street-information.dto';
import * as L from 'leaflet';
import { SetRegionName } from '../store/region-detail.action';
import { SetSelectedSafetyMetrics, SetStreet } from '../store/street-detail.actions';
import { AddToStreetCache } from '../store/street-map.actions';

@Injectable({ providedIn: 'root' })
export class StreetsMapFacade {
	private readonly _streetsRequestService = inject(StreetsRequestService);
	private readonly _incidentRequestService = inject(IncidentsRequestService);
	private readonly _safetyMetricsRequestService = inject(SafetyMetricsRequestService);
	private readonly _regionRequestService = inject(RegionRequestService);
	private readonly _methodRunService = inject(MethodRunService);
	private readonly _store = inject(Store);

	private _fetchStreetSubject = new Subject<IGetStreetGrid>();

	constructor() {
		this._fetchStreetSubject
			.pipe(
				debounceTime(300),
				distinctUntilChanged((a, b) => {
					const zoomA = a.zoom ?? 0;
					const zoomB = b.zoom ?? 0;

					// Determine zoom groups
					const groupA = zoomA <= 9 ? 1 : (zoomA <= 11 ? 2 : 3);
					const groupB = zoomB <= 9 ? 1 : (zoomB <= 11 ? 2 : 3);

					if (groupA !== groupB) {
						// Different zoom groups → treat as different
						return false;
					}

					// Ignore zoom when comparing deeply
					const { zoom: _, ...restA } = a;
					const { zoom: __, ...restB } = b;

					return deepEquals(restA, restB);
				}),
				switchMap((params) =>
					this._streetsRequestService.getStreetGrid(params).pipe(
						tap((response: StreetInformationDto[]) => {
							const batch: GeoJSON<any, Geometry>[] = [];
							for (const streetInformation of response) {
								batch.push(this.toGeoJSON(streetInformation, params.zoom));
							}
							this._store.dispatch(new AddToStreetCache(batch));
						})
					)
				)
			)
			.subscribe();
	}

	public fetchStreetInformation(requestParams: IGetStreetGrid): void {
		this._fetchStreetSubject.next(requestParams);
	}

	private toGeoJSON(street: StreetInformationDto, zoom: number): GeoJSON<any, Geometry> {
		console.log(street)
		return L.geoJSON(JSON.parse(`${street.way}`), {
			style: {
				color: street.dangerousColor,
				weight: 2.5,
			},
			onEachFeature: (feature, layer) => {
				// @TODO is click or hover better?
				layer.on('click', () => {
					if (zoom <= 11) {
						this._store.dispatch(new SetRegionName({ name: street?.name}))
					} else {
						this._store.dispatch(new SetStreet({ id: street.osm_id } as any));
					}
				});
			}
		});
	}

	public fetchSafetyMetricsForStreet(streetId: number, filter: MapFilterOptionsInterface): Observable<SafetyMetricsDto> {
		return this._safetyMetricsRequestService.getSafetyMetricsForStreet(streetId, filter).pipe(
			take(1),
			tap((response: SafetyMetricsDto) => {
				this._store.dispatch(new SetSelectedSafetyMetrics(response));
			})
		);
	}


	public fetchIncidentsForStreet(streetId: number, filter: MapFilterOptionsInterface): Observable<IIncident[]> {
		return this._incidentRequestService.getIncidentForStreet(streetId, filter)
	}

	public fetchLastMethodRun(methodName: string) {
		return this._methodRunService.getDateOfLastMethodRun(methodName);
	}

	public fetchSafetyMetricsForRegion(regionName: string, filter: MapFilterOptionsInterface): Observable<ISafetyMetricsRegion> {
		return this._regionRequestService.getRegionSafetyMetrics(regionName, filter);
	}
}
