import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { IncidentInterface } from '@simra/incidents-models';
import { GetStreetInformationInterface, SafetyMetricsDto } from '@simra/streets-common';
import { Geometry } from 'geojson';
import { GeoJSON } from 'leaflet';
import { Observable, take, tap } from 'rxjs';
import { IncidentsRequestService } from '../../infrastructure/incidents-request.service';
import { SafetyMetricsRequestService } from '../../infrastructure/safety-metrics-request.service';
import { StreetsRequestService } from '../../infrastructure/streets-request.service';
import { StreetInformationDto } from '../../models/dtos/street-information.dto';
import * as L from 'leaflet';
import { SetHoveredStreetId, AddToStreetCache } from '../street-map.actions';

@Injectable({ providedIn: 'root' })
export class StreetsExploringMapFacade {
	private readonly _streetsRequestService = inject(StreetsRequestService);
	private readonly _incidentRequestService = inject(IncidentsRequestService);
	private readonly _safetyMetricsRequestService = inject(SafetyMetricsRequestService);
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
					this._store.dispatch(new SetHoveredStreetId(street.osm_id));
				});
			}
		});
	}

	public fetchStreetInformation(requestParams: GetStreetInformationInterface) {
		this._streetsRequestService.getStreetInformation(requestParams).pipe(
			take(1),
			tap((response: StreetInformationDto[]) => {
				const batch: GeoJSON<any, Geometry>[] = [];
				for (const streetInformation of response) {
					batch.push(this.toGeoJSON(streetInformation));
				}
				if (batch.length > 0) {
					this._store.dispatch(new AddToStreetCache(batch));
				}
			})
		).subscribe();
	}

	public fetchSafetyMetricsForStreet(streetId: number): Observable<SafetyMetricsDto> {
		return this._safetyMetricsRequestService.getSafetyMetricsForStreet(streetId);
	}

	public fetchIncidentsForStreet(streetId: number): Observable<IncidentInterface[]> {
		return this._incidentRequestService.getIncidentForStreet(streetId)
	}
}
