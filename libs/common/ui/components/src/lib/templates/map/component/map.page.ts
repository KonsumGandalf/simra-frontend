import { CommonModule } from '@angular/common';
import {
	ApplicationRef,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	ElementRef,
	EventEmitter,
	inject,
	Injector,
	input,
	Output,
	signal,
	Signal,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { LeafletControlLayersConfig, LeafletModule } from '@bluehalo/ngx-leaflet';
import { Deck } from '@deck.gl/core';
import { GeocodingControl } from '@maptiler/geocoding-control/maplibregl';
import { Store } from '@ngxs/store';
import { APP_CONFIG, IMapPosition } from '@simra/common-models';
import { IncidentsMapFacade } from '@simra/incidents-domain';
import { IIncident, IIncidentMarker } from '@simra/incidents-models';
import { IEnrichedStreet } from '@simra/streets-common';
import { StreetMapState } from '@simra/streets-domain';
import { FeatureCollection, Geometry } from 'geojson';
import maplibregl from 'maplibre-gl';
import { PopoverModule } from 'primeng/popover';
import { SetStreetCollection } from '../../../../../../../../streets/domain/src/lib/application/store/street-map.actions';
import { ChartColors } from '../../../models/chart-colors';
import { BERLIN_POSITION, DEFAULT_LAYER_CONFIG } from '../../models/const';
import {
	incidentsLayer,
	incidentsLayerCluster,
	incidentsLayerClusterCount,
	incidentsSource,
	streetsLayer,
	streetsSource,
} from '../models/const';
import { createIncidentMarker } from '../models/create-incident-marker';
import { EMapViewMode } from '../models/enum/map-view-mode.enum';
import { EPin } from '../models/pin-enum';
import { addPolygonLayer } from '../models/utils/add-region-layer';
import { addRideLayer } from '../models/utils/add-ride-layer';

/**
 * This component allows to interact with the leaflet map smoothly
 */
@Component({
	selector: 't-map-component',
	imports: [CommonModule, LeafletModule, PopoverModule],
	templateUrl: './map.page.html',
	styleUrl: './map.page.scss',
	host: {
		class: 't-map-component',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPage {
	@ViewChild('mapContainer', { static: true })
	mapContainer: ElementRef<HTMLDivElement>;
	private readonly _injector = inject(Injector);
	private readonly _appRef = inject(ApplicationRef);
	private readonly _incidentsMapFacade = inject(IncidentsMapFacade);
	private readonly _store = inject(Store);
	private readonly  _mapTilerToken = inject(APP_CONFIG).mapTilerToken;

	private mlMap?: maplibregl.Map;
	private readonly _mapReady = signal<boolean>(false);

	private deck?: Deck;

	private readonly _activatedRoute = inject(ActivatedRoute);

	public readonly lastRun = input<Date>();

	public isSearchable = input<boolean>(false);
	public isNavigable = input<boolean>(false);
	public viewMode = input<EMapViewMode>(EMapViewMode.DEFAULT);
	public readonly streets = input<IEnrichedStreet[]>([]);
	public readonly incidents = input<IIncidentMarker[] | IIncident[]>([]);
	public readonly regionCollection = input<FeatureCollection<Geometry, any>>();
	public readonly rideCollection = input<FeatureCollection<Geometry, any>>();

	@Output()
	streetSelected = new EventEmitter<number>();

	@Output()
	regionSelected = new EventEmitter<string>();

	@Output()
	mapInitiated = new EventEmitter<void>()

	private readonly queryParams = toSignal(this._activatedRoute.queryParams);
	public readonly routerPosition: Signal<IMapPosition> = computed(() => {
		const {
			lat = BERLIN_POSITION.lat,
			lng = BERLIN_POSITION.lng,
			zoom = BERLIN_POSITION.zoom,
			isNavigated = false
		} = (this.queryParams() as IMapPosition) ?? {};

		return { lat, lng, zoom, isNavigated };
	});
	private position = signal<IMapPosition>(undefined);

	constructor() {

		effect(() => {
			const streets = this._streetCollection();
			const regions = this.regionCollection();
			const mapReady = this._mapReady();
			const viewMode = this.viewMode();

			const isReady = !!streets && !!regions && mapReady && viewMode === EMapViewMode.DEFAULT;

			if (!isReady || !this.mlMap) return;

			if (this.mlMap.loaded()) {
				this.onStreetLoad(streets);
				addPolygonLayer(this.mlMap, regions, this.regionSelected, viewMode);
			} else {
				this.mlMap.on('load', () => {
					this.onStreetLoad(streets);
					addPolygonLayer(this.mlMap!, regions, this.regionSelected, viewMode);
				});
			}
		});


		effect(() => {
			const regionCollection = this.regionCollection();
			const mapReady = this._mapReady();
			const viewMode = this.viewMode();

			if (!regionCollection || !mapReady || !this.mlMap || viewMode !== EMapViewMode.REGION) return;

			if (this.mlMap.loaded()) {
				addPolygonLayer(this.mlMap, this.regionCollection(), this.regionSelected, viewMode);
			} else {
				this.mlMap.on('load', () => {
					addPolygonLayer(this.mlMap!, this.regionCollection(), this.regionSelected, viewMode);
				});
			}
		});

		effect(() => {
			const markerCollection = this._markerCollection();
			const mapReady = this._mapReady();
			const viewMode = this.viewMode();

			if (!markerCollection || !mapReady || !this.mlMap) return;

			if (this.mlMap?.loaded()) {
				this.onMarkerLoad(markerCollection, viewMode);
			} else {
				this.mlMap?.on('load', () => {
					this.onMarkerLoad(markerCollection, viewMode)
				});
			}
		});

		effect(() => {
			const rideCollection = this.rideCollection();
			const mapReady = this._mapReady();

			if (!rideCollection || !mapReady || !this.mlMap) return;

			if (this.mlMap?.loaded()) {
				addRideLayer(this.mlMap, rideCollection);
			} else {
				this.mlMap?.on('load', () => {
					addRideLayer(this.mlMap, rideCollection)
				});
			}
		});

		effect(() => {
			const streets = this.streets();
			if (!streets || !streets.length) return;

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
			this._store.dispatch(new SetStreetCollection(collection));
		});

		effect(() => {
			const streetCollection = this._streetCollection();
			const markerCollection = this._markerCollection();
			const mapReady = this._mapReady();
			const viewMode = this.viewMode();

			if (!streetCollection || !markerCollection || !mapReady || !this.mlMap || viewMode !== EMapViewMode.STREET) {
				return;
			}

			const handle = () => {
				this.onStreetLoad(streetCollection);
				this.onMarkerLoad(markerCollection, viewMode);
			};

			if (this.mlMap.loaded()) {
				handle();
			} else {
				this.mlMap.on('load', handle);
			}
		});


		effect(() => {
			const position = this.routerPosition();
			const navigable = this.isNavigable();

			if (!this.mlMap) {
				this.initMap(position, navigable);
				return;
			}

			if (!position) return;

			if (navigable && position.isNavigated) {
				this.mlMap?.flyTo({
					center: [position.lng, position.lat],
					zoom: position.zoom,
					speed: 3,
					curve: 1,
				});
			} else {
				this.mlMap?.jumpTo({
					center: [position.lng, position.lat],
					zoom: position.zoom,
				});
			}
		});

		effect(() => {
			const mapReady = this._mapReady();
			const data = this.rideCollection();

			if (!mapReady || !data || !this.mlMap) return;


		});

	}

	public layerControl = input<LeafletControlLayersConfig>(DEFAULT_LAYER_CONFIG);

	private readonly _streetCollection = this._store.selectSignal(StreetMapState.getStreetCollection);

	private readonly _markerCollection = computed(() => {
		const markers = this.incidents();
		if (!markers) return;

		if (markers.length === 0) {
			this._removeSource(incidentsSource);
			this._removeLayer(incidentsLayer);
			return;
		}

		return {
			type: 'FeatureCollection',
			features: markers.map((m) => ({
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
	});

	async initMap(position: IMapPosition, navigable: boolean) {
		this.mlMap = new maplibregl.Map({
			container: this.mapContainer.nativeElement,
			style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${this._mapTilerToken}`,
			center: [position.lng, position.lat],
			zoom: position.zoom,
		});
		this.mlMap.getCanvas().style.cursor = 'default';

		const redPin = await this.mlMap.loadImage('/assets/icons/incidents/ui/pin-red.png');
		const bluePin = await this.mlMap.loadImage('/assets/icons/incidents/ui/pin-blue.png');
		this.mlMap.addImage(EPin.RED, redPin.data);
		this.mlMap.addImage(EPin.BLUE, bluePin.data);

		if(navigable) {
			const geocoder = new GeocodingControl({ apiKey: this._mapTilerToken});
			this.mlMap.addControl(geocoder);
		}

		setTimeout(() => {
			this.mlMap?.resize();
		}, 0);

		this._mapReady.set(true);

		this.mapInitiated.emit();
	}

	ngOnDestroy() {
		if (this.deck) this.deck.finalize();
		if (this.mlMap) this.mlMap.remove();
	}

	private async onStreetLoad(streetCollection: FeatureCollection<Geometry, IEnrichedStreet>) {
		this._removeLayer(streetsLayer);
		this._removeSource(streetsSource);

		this.mlMap!.addSource(streetsSource, {
			type: 'geojson',
			data: streetCollection,
		});

		this.mlMap!.addLayer({
			id: streetsLayer,
			type: 'line',
			source: streetsSource,
			paint: {
				'line-color': ['get', 'dangerousColor'],
				'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1, 14, 3],
			},
			minzoom: 11
		});

		this._changeCursor(streetsLayer);

		this.mlMap.on('click', streetsLayer, (evt) => {
			const f = evt.features?.[0];

			if (f?.properties && f?.properties['osmId']) {
				this.streetSelected.emit(f?.properties['osmId']);
			}
		});
	}

	private onMarkerLoad(markerCollection: FeatureCollection<Geometry, IIncidentMarker>, mapViewMode: EMapViewMode) {
		const isClustered = mapViewMode === EMapViewMode.CLUSTERED;

		this._removeLayer(incidentsLayer);
		this._removeSource(incidentsSource);

		this.mlMap!.addSource(incidentsSource, {
			type: 'geojson',
			data: markerCollection,
			cluster: isClustered
		});

		this.mlMap.addLayer({
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
		if (isClustered) {
			this._removeLayer(incidentsLayerCluster);
			this._removeLayer(incidentsLayerClusterCount);

			this.mlMap.addLayer({
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

			this.mlMap.addLayer({
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
		}

		this._changeCursor(incidentsLayer);

		this.mlMap.on('click', incidentsLayer, async (evt) => {
			const f = evt.features?.[0];
			if (f?.properties) {
				await createIncidentMarker(
					{ id: f.properties['id'] } as IIncident,
					this._injector,
					this._appRef,
					this._incidentsMapFacade.getIncidentDetails.bind(this._incidentsMapFacade),
					this.mlMap,
				);
			}
		});
	}

	private _changeCursor(layerId: string) {
		this.mlMap.on('mouseenter', layerId, () => {
			this.mlMap!.getCanvas().style.cursor = 'pointer';
		});

		this.mlMap.on('mouseleave', layerId, () => {
			this.mlMap!.getCanvas().style.cursor = 'default';
		});
	}

	private _removeLayer(layerId: string) {
		if (this.mlMap?.getLayer(layerId)) {
			this.mlMap.removeLayer(layerId);
		}
	}

	private _removeSource(sourceId: string) {
		if (this.mlMap?.getSource(sourceId)) {
			this.mlMap.removeSource(sourceId);
		}
	}

}
