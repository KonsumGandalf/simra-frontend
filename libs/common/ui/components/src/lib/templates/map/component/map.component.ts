import { Component, computed, input, model, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletControlLayersConfig, LeafletModule } from '@bluehalo/ngx-leaflet';
import {
	Control,
	icon,
	latLng,
	Layer,
	LeafletEvent,
	Map,
	MapOptions,
	Marker,
	tileLayer,
} from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { MapPositionInterface } from '@simra/common-models';
import { PopoverModule } from 'primeng/popover';
import { DangerousScoreBarComponent } from '../../../molecules/dangerous-score-bar/component/dangerous-score-bar.component';

/**
 * This component allows to interact with the leaflet map smoothly
 */
@Component({
	selector: 't-map-componenent',
	standalone: true,
	imports: [CommonModule, LeafletModule, DangerousScoreBarComponent, PopoverModule],
	templateUrl: './map.component.html',
	styleUrl: './map.component.scss',
	host: {
		class: 'o-simra-map',
	},
})
export class MapComponent {
	public readonly _leafletPosition = model<MapPositionInterface>({
		lat: 52.522,
		lng: 13.413,
		zoom: 14,
	});
	/**
	 * Represents the layers which should be mapped onto the open street map often those are GeoJSONs as Overlays
	 */
	public readonly overlayLayers = input.required<Layer[]>();

	protected readonly initialOptions: MapOptions = {
		zoom: this._leafletPosition().zoom,
		center: latLng(this._leafletPosition().lat, this._leafletPosition().lng),
		preferCanvas: true,
	};

	/**
	 * The base layer on which other objects are projected to
	 */
	private readonly _baseLayer: Layer = tileLayer(
		'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
		{
			maxZoom: 18,
			attribution: '...',
		},
	);

	/**
	 * The overall layer containing the base layer with overlays
	 */
	protected readonly combinedLayers$: Signal<Layer[]> = computed(() => {
		return [this._baseLayer, ...(this.overlayLayers() || [])];
	});

	/**
	 * The appearance options the user can choose from when using the map
	 */
	protected readonly layerControl: LeafletControlLayersConfig = {
		baseLayers: {
			'Open Cycle Map': tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '...',
			}),
			'Osm Liberty': tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
				maxZoom: 30,
				minZoom: 12,
			}),
			google: tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
				maxZoom: 20,
				subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
			}),
		},
		overlays: {},
	};

	constructor() {
		Marker.prototype.options.icon = icon({
			iconUrl: 'assets/leaflet/marker-icon.png',
			iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
			shadowUrl: 'assets/leaflet/marker-shadow.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41],
		});
	}

	onMapReady(map: Map): void {
		const provider = new OpenStreetMapProvider();
		const searchControl: Control = GeoSearchControl({
			provider,
			style: 'bar',
			showMarker: true,
			retainZoomLevel: false,
			autoClose: true,
			autoCompleteDelay: 50,
		});

		map.addControl(searchControl);
	}

	/**
	 * This function handles changes to the position of the map f.e. when the user zooms in
	 *
	 * @param event - the leaflet event emitted
	 */
	onMapChange(event: LeafletEvent): void {
		this._leafletPosition.set({
			zoom: event.sourceTarget.getZoom(),
			...event.sourceTarget.getCenter(),
		});
	}
}
