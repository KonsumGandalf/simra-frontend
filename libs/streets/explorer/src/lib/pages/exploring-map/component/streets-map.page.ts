import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject, resource,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureCollection, Geometry } from 'geojson';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { DangerousScoreBarComponent, MapPage, MapUtils, SafetyMetricsDigitPanelComponent } from '@simra/common-components';
import { IMapPosition } from '@simra/common-models';
import { MapFilterState } from '@simra/common-state';
import { asyncComputed } from '@simra/common-utils';

import { IEnrichedRegion, IEnrichedStreet, IResponseStreet } from '@simra/streets-common';
import { RegionMapState, SetRegionName, SetStreet, StreetDetailState, StreetMapState, StreetsMapFacade } from '@simra/streets-domain';
import { isNil, isEmpty, omitBy } from 'lodash';
import { Card } from 'primeng/card';
import { firstValueFrom } from 'rxjs';
import { RegionDetailState } from '@simra/streets-domain';
import * as maplibregl from 'maplibre-gl';
import { polygonLayerLarge, polygonLayerMedium, polygonSource, streetsLayer, streetsSource } from '../models/const';

@Component({
	selector: 'streets-map',
	imports: [
		CommonModule,
		MapPage,
		DangerousScoreBarComponent,
		SafetyMetricsDigitPanelComponent,
		Card,
		TranslatePipe,
	],
	templateUrl: './streets-map.page.html',
	styleUrl: './streets-map.page.scss',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'o-streets-map',
	},
})
export class StreetsMapPage {
	private readonly _streetsMapFacade = inject(StreetsMapFacade);
	private readonly _store = inject(Store);

	protected _mapPosition = signal<IMapPosition>(undefined);
	protected readonly _filterState = this._store.selectSignal(MapFilterState.getMapFilterState);
	protected readonly streets$ = this._store.selectSignal(StreetMapState.getStreetCollection);
	protected readonly hoveredStreet$ = this._store.selectSignal(StreetDetailState.getStreet);
	protected readonly hoveredRegion$ = this._store.selectSignal(RegionDetailState.getRegionName);
	protected readonly enrichedStreets = this._store.selectSignal(StreetMapState.getEnrichedStreets);
	protected readonly enrichedRegions$ = this._store.selectSignal(RegionMapState.getEnrichedRegionMap);
	protected readonly lastSafetyMetrics$ = signal<any>(null);
	protected readonly showOverlay$ = signal(true);
	protected readonly lastRun$ = toSignal(
		this._streetsMapFacade.fetchLastMethodRun('calculateSafetyMetricsHighway'),
	);
	private _mlMap= signal<maplibregl.Map>(undefined);

	constructor() {
		this._store.dispatch(new SetStreet(undefined));
		this._streetsMapFacade.fetchStreetGrid();
		this._streetsMapFacade.fetchRegionMap();

		effect(() => {
			const streets = this.enrichedStreets();
			const enrichedRegions = this.enrichedRegions$();
			const mlMap = this._mlMap();

			if (isNil(mlMap) || isEmpty(streets) || isEmpty(enrichedRegions)) {
				return;
			}

			this.addStreetLayer(streets, mlMap);
			this.addRegionLayer(enrichedRegions, mlMap);
		});
	}

	addStreetLayer(streets: IEnrichedStreet[], mlMap: maplibregl.Map) {
		const collection = {
			type: 'FeatureCollection',
			features: streets.map((s) => ({
				type: 'Feature',
				geometry: JSON.parse(`${s.way}`) as Geometry,
				properties: {
					osmId: s?.osmId,
					dangerousColor: s.dangerousColor,
				},
			})),
		} as FeatureCollection<Geometry, IEnrichedStreet>;

		const source = mlMap.getSource(streetsSource) as maplibregl.GeoJSONSource;
		if (source) {
			source.setData(collection);
			return;
		}
		mlMap.addSource(streetsSource, {
			type: 'geojson',
			data: collection,
		});

		mlMap.addLayer({
			id: streetsLayer,
			type: 'line',
			source: streetsSource,
			paint: {
				'line-color': ['get', 'dangerousColor'],
				'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1, 14, 3],
			},
			minzoom: 11
		});

		MapUtils.changeCursor(mlMap, streetsLayer);

		mlMap.on('click', streetsLayer, (evt) => {
			const f = evt.features?.[0];

			if (f?.properties && f?.properties['osmId']) {
				this._store.dispatch(new SetStreet({ id: f?.properties['osmId'] } as IResponseStreet));
			}
		});
	}

	addRegionLayer(regions: IEnrichedRegion[], mlMap: maplibregl.Map) {
		const collection = {
			type: 'FeatureCollection',
			features: regions.map((region) => ({
				type: 'Feature',
				geometry: JSON.parse(`${region.way}`),
				properties: {
					name: region.name,
					dangerousColor: region.dangerousColor,
					adminLevel: region.adminLevel,
				},
			})),
		}  as FeatureCollection<Geometry, IEnrichedRegion>;

		const source = mlMap.getSource(polygonSource) as maplibregl.GeoJSONSource;
		if (source) {
			source.setData(collection);
			return;
		}

		mlMap.addSource(polygonSource, {
			type: 'geojson',
			data: collection,
		});

		mlMap.addLayer({
			id: polygonLayerMedium,
			type: 'fill',
			source: polygonSource,
			paint: {
				'fill-color': ['get', 'dangerousColor'],
				'fill-opacity': 0.5,
			},
			filter: ['>=', ['get', 'adminLevel'], 6],
			maxzoom: 11,
			minzoom: 8,
		});

		mlMap.on('click', polygonLayerMedium, (e) => {
			const name = e.features?.[0].properties?.['name'];
			this._store.dispatch(new SetRegionName({ name }));
		});
		MapUtils.changeCursor(mlMap, polygonLayerMedium);

		mlMap.addLayer({
			id: polygonLayerLarge,
			type: 'fill',
			source: polygonSource,
			paint: {
				'fill-color': ['get', 'dangerousColor'],
				'fill-opacity': 0.5,
			},
			filter: ['==', ['get', 'adminLevel'], 4],
			maxzoom: 8,
		});

		MapUtils.changeCursor(mlMap, polygonLayerLarge);

		mlMap.on('click', polygonLayerLarge, (e) => {
			const name = e.features?.[0].properties?.['name'];
			this._store.dispatch(new SetRegionName({ name }));
		});
	}

	incidents = resource({
		request: () => this.hoveredStreet$(),
		loader: async ({ request }) => {
			if (!request) {
				return;
			}

			return await firstValueFrom(
				this._streetsMapFacade.fetchIncidentsForStreet(request.id, this._filterState()),
			);
		},
	})

	onMapReady(map: maplibregl.Map) {
		this._mlMap.set(map);
	}

	/**
	 * Import Data to the cache for the Grid
	 * @protected
	 */
	protected readonly safetyMetricsStreets$ = resource({
		request: () => {
			const street = this.hoveredStreet$();
			const filter = this._filterState();

			return { street, filter };
		},
		loader: async ({ request }) => {
			const { street, filter } = request;
			if (!street || !filter) {
				return;
			}

			const safetyMetrics = await firstValueFrom(
				this._streetsMapFacade.fetchSafetyMetricsForStreet(street.id, filter),
			);

			this.showOverlay$.set(false);
			this.lastSafetyMetrics$.set(safetyMetrics);
		},
	});
	protected readonly safetyMetricsRegion$ = resource({
		request: () => {
			const regionName = this.hoveredRegion$();
			const filter = this._filterState();

			return { regionName, filter };
		},
		loader: async ({ request }) => {
			const { regionName, filter } = request;

			if (!regionName || !filter) {
				return;
			}

			const safetyMetrics = await firstValueFrom(
				this._streetsMapFacade.fetchSafetyMetricsForRegion(regionName, filter),
			);

			this.showOverlay$.set(false);
			this.lastSafetyMetrics$.set(safetyMetrics);
		},
	});
	protected readonly incidents$ = asyncComputed(() => {
		const hoveredStreet = this.hoveredStreet$();
		const filter = this._filterState();
		if (hoveredStreet === undefined) {
			return undefined;
		}

		return firstValueFrom(
			this._streetsMapFacade.fetchIncidentsForStreet(hoveredStreet.id, filter),
		);
	});
	safetyMetricsStreets = resource({
		request: () => this._filterState(),
		loader: async ({ request }) => {
			const filter = request;

			if (!filter || isEmpty(omitBy(filter, isEmpty))) {
				return;
			}

			await firstValueFrom(
				this._streetsMapFacade.updateMap(filter),
			);

			await firstValueFrom(
				this._streetsMapFacade.updateRegionMap(filter),
			)
		},
	});
}
