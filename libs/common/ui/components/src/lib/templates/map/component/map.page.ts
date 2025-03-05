import {
	Component,
	computed, effect, EventEmitter, inject,
	input, Output,
	Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { LeafletControlLayersConfig, LeafletModule } from '@bluehalo/ngx-leaflet';
import {
	Control,
	latLng,
	Layer,
	LeafletEvent,
	Map,
	MapOptions,
} from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { MapPositionInterface } from '@simra/common-models';
import { PopoverModule } from 'primeng/popover';
import { BERLIN_POSITION, DEFAULT_LAYER_CONFIG } from '../../models/const';
import { EBaseLayerTypes } from '../../models/enums/base-layer-types';
import { BASE_MAP_LAYER } from '../../models/maps/base-map-layer';

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
})
export class MapPage {
	private readonly _activatedRoute = inject(ActivatedRoute);
	private readonly _router = inject(Router);

	/**
	 * Represents the layers which should be mapped onto the open street map often those are GeoJSONs as Overlays
	 */
	public readonly overlayLayers = input.required<Layer[]>();

	@Output()
	public positionChange = new EventEmitter<MapPositionInterface>();

	private map?: Map;

	public isSearchable = input<boolean>(false);

	constructor() {
		effect(() => {
			const position = this.leafletPosition();

			if (this.map) {
				this.map.setView(latLng(position.lat, position.lng), position.zoom);
			}

			this.positionChange.emit(position);
		});
	}

	private queryParams = toSignal(this._activatedRoute.queryParams);
	public readonly leafletPosition: Signal<MapPositionInterface> = computed(() => {
		const {
			lat = BERLIN_POSITION.lat,
			lng = BERLIN_POSITION.lng,
			zoom = BERLIN_POSITION.zoom
		} = this.queryParams() as MapPositionInterface ?? {};

		return { ...BERLIN_POSITION, lat, lng, zoom };
	});

	/**
	 * Map options which are applied at the start
	 */
	public readonly initialOptions: MapOptions = {
		zoom: this.leafletPosition().zoom,
		center: latLng(this.leafletPosition().lat, this.leafletPosition().lng),
		layers: [BASE_MAP_LAYER[EBaseLayerTypes.OSM_HOT]],
		preferCanvas: true,
	};

	/**
	 * The appearance options the user can choose from when using the map
	 */
	public layerControl = input<LeafletControlLayersConfig>(DEFAULT_LAYER_CONFIG);

	onMapReady(map: Map): void {
		const isSearchable = this.isSearchable();

		if (isSearchable) {
			const provider = new OpenStreetMapProvider();
			const searchControl: Control = GeoSearchControl({
				provider,
				style: 'bar',
				showMarker: true,
				retainZoomLevel: false,
				autoClose: true,
			});

			map.addControl(searchControl);
		}

		this.map = map;
	}

	/**
	 * This function handles changes to the position of the map f.e. when the user zooms in
	 *
	 * @param event - the leaflet event emitted
	 */
	onMapChange(event: LeafletEvent): void {
		const center = event.sourceTarget.getCenter();
		const zoom = event.sourceTarget.getZoom();
		this._router.navigate([], {
			queryParams: { lat: center.lat.toFixed(5), lng: center.lng.toFixed(5), zoom },
			queryParamsHandling: 'merge',
		})
	}
}
