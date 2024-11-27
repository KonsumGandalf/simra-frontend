import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	Signal,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { LeafletControlLayersConfig, LeafletModule } from '@bluehalo/ngx-leaflet';
import { ExecutingMapFacade } from '@simra/rides-incident-domain';
import {
	circle,
	Control,
	latLng,
	Layer,
	MapOptions,
	marker,
	polygon,
	tileLayer,
} from 'leaflet';
import { map, tap } from 'rxjs';
import { icon, Marker, Map } from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import * as L from 'leaflet';

@Component({
	selector: 'simra-exploring-map',
	standalone: true,
	imports: [CommonModule, LeafletModule],
	templateUrl: './exploring-map.component.html',
	styleUrl: './exploring-map.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'o-simra-exploring-map',
	},
})
export class ExploringMapComponent {
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

	private readonly _exploringMapFacade = inject(ExecutingMapFacade);
	private readonly _incidents$ = toSignal(
		this._exploringMapFacade.getIncidents().pipe(
			map((incidents) =>
				incidents
					.filter((incident) => incident.lat != 0 && incident.lng != 0)
					.map((incident) => ({
						lat: incident.lat,
						lng: incident.lng,
						label: incident.description,
					})),
			)
		),
	);
	protected readonly options: MapOptions = {
		zoom: 14,
		center: latLng(52.522, 13.413),
	};

	geoJsonString = `{
    "type": "Feature",
    "id": "OpenLayers.Feature.Vector_314",
    "properties": {},
    "geometry": {
    "type": "LineString",
    "crs": { "type": "name", "properties": { "name": "EPSG:3857" } },
    "coordinates": [
      [13.3248508,52.527798299],[13.3247332,52.527810699],[13.3244606,52.527839499],[13.3238763,52.527901299],[13.3233515,52.527956699],[13.323009,52.527992899],[13.3223164,52.528066099],[13.3213569,52.528167499],[13.3205986,52.528249199]
    ]
  },
    "crs": {
        "type": "name",
        "properties": {
            "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
    }
}`;
	// Parse the GeoJSON string
	private readonly geoJsonLayer = L.geoJSON(JSON.parse(this.geoJsonString), {
		style: {
			color: 'blue',
			weight: 3,
		},
	});
	protected readonly _layerControl: LeafletControlLayersConfig = {
		baseLayers: {
			'own tile': tileLayer('http://192.168.188.35:4444/tile/{z}/{x}/{y}.png\n', {
				maxZoom: 30,
				minZoom: 12,
			}),
			'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '...',
			}),
			'Open Cycle Map': tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '...',
			}),
			'Osm Liberty': tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
				maxZoom: 30,
				minZoom: 12,
			}),
			google: tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
				maxZoom: 20,
				subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
			}),
		},
		overlays: {
			'Big Circle': circle([52.522, 13.413], { radius: 5000 }),
			'Big Square': polygon([
				[46.8, -121.55],
				[46.9, -121.55],
				[46.9, -121.7],
				[46.8, -121.7],
			]),

			Huttenstraße: this.geoJsonLayer,
		},
	};

	protected readonly _layers$: Signal<Layer[]> = computed(() => {
		const incidents = this._incidents$() || [];

		return [
			tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '...',
			}),
			...incidents.map((incident) =>
				marker([incident.lat, incident.lng], { title: incident.label }),
			),
		];
	});

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
}
