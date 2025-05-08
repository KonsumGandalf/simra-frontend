import {
	ApplicationRef,
	ChangeDetectionStrategy,
	Component, effect,
	inject, Injector, signal,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { IncidentsMapFacade, IncidentsState} from '@simra/incidents-domain';
import { IIncidentMarker } from '@simra/incidents-models';
import { FeatureCollection, Geometry } from 'geojson';
import * as maplibregl from 'maplibre-gl';
import { firstValueFrom } from 'rxjs';
import { ChartColors, EPin, MapPage } from '@simra/common-components';
import { incidentsLayer, incidentsLayerCluster, incidentsLayerClusterCount, incidentsSource } from '../models/const';

@Component({
	selector: 'incident-map',
	imports: [CommonModule, MapPage],
	templateUrl: './incidents-map.page.html',
	styleUrl: './incidents-map.page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'o-incidents-map',
	},
})
export class IncidentsMapPage {
	private readonly _incidentsMapFacade = inject(IncidentsMapFacade);
	private readonly _store = inject(Store);
	private readonly _injector = inject(Injector);
	private readonly _appRef = inject(ApplicationRef);

	protected readonly incidentMarker$ = this._store.selectSignal(IncidentsState.getIncidentMarkers);
	private _mlMap= signal<maplibregl.Map>(undefined);

	protected readonly _lastRun$ = toSignal(
		this._incidentsMapFacade.fetchLastMethodRun('calculateSafetyMetricsHighway'),
	);

	constructor() {
		effect(async () => {
			await firstValueFrom(this._incidentsMapFacade.getIncidentMarker());
		});

		effect(() => {
			const mlMap = this._mlMap();
			const incidents = this.incidentMarker$() || [];
			if (!mlMap || !incidents) {
				return;
			}

			const markerCollection = {
				type: 'FeatureCollection',
				features: incidents.map((m) => ({
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [m.lng, m.lat],
					},
					properties: {
						id: m.id,
						scary: m.scary,
					},
				})),
			} as FeatureCollection<Geometry, IIncidentMarker>;

			mlMap.addSource(incidentsSource, {
				type: 'geojson',
				data: markerCollection,
				cluster: true
			});

			mlMap.addLayer({
				id: incidentsLayer,
				type: 'symbol',
				source: incidentsSource,
				layout: {
					'icon-allow-overlap': true,
					'icon-ignore-placement': true,
					'icon-image': [
						'case',
						['==', ['get', 'scary'], true],
						EPin.RED,
						EPin.BLUE,
					],
					'icon-size': [
						'interpolate',
						['linear'],
						['zoom'],
						10, 0.15,
						14, 0.2,
						17, 0.3
					]
				},
				minzoom: 11,
				paint: {
					'icon-opacity': 1
				}
			});
			mlMap.addLayer({
				id: incidentsLayerCluster,
				type: 'circle',
				source: incidentsSource,
				filter: ['has', 'point_count'],
				paint: {
					'circle-color': [
						'step',
						['get', 'point_count'],
						ChartColors.INCIDENT_TYPES[0],
						10,
						ChartColors.INCIDENT_TYPES[1],
						20,
						ChartColors.INCIDENT_TYPES[2],
						50,
						ChartColors.INCIDENT_TYPES[3],
						100,
						ChartColors.INCIDENT_TYPES[4],
						500,
						ChartColors.INCIDENT_TYPES[5],
						1000,
						ChartColors.INCIDENT_TYPES[6],
						5000,
						ChartColors.INCIDENT_TYPES[7],
					],
					'circle-radius': [
						'step',
						['get', 'point_count'],
						20,
						100,
						30,
						750,
						40
					]
				}
			});

			mlMap.addLayer({
				id: incidentsLayerClusterCount,
				type: 'symbol',
				source: incidentsSource,
				filter: ['has', 'point_count'],
				layout: {
					'text-field': '{point_count_abbreviated}',
					'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
					'text-size': 12
				}
			});
		});
	}

	onMapReady(map: maplibregl.Map) {
		this._mlMap.set(map);
	}
}
