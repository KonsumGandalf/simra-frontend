import { TranslatePipe } from '@ngx-translate/core';
import { latLng, Layer, LeafletEvent, MapOptions } from 'leaflet';
import 'leaflet.markercluster';

import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	Signal,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@bluehalo/ngx-leaflet-markercluster';
import { IMapPosition } from '@simra/common-models';

import { BERLIN_POSITION, DEFAULT_LAYER_CONFIG } from '../../models/const';
import { EBaseLayerTypes } from '../../models/enums/base-layer-types';
import { BASE_MAP_LAYER } from '../../models/maps/base-map-layer';

@Component({
	selector: 't-marker-cluster-map-page',
	imports: [CommonModule, LeafletMarkerClusterModule, LeafletModule, TranslatePipe],
	templateUrl: './marker-cluster-map.page.html',
	styleUrl: './marker-cluster-map.page.scss',
	host: {
		class: 't-marker-cluster-map-page',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerClusterMapPage {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);

	private queryParams = toSignal(this.route.queryParams);

	public readonly leafletPosition: Signal<IMapPosition> = computed(() => {
		const {
			lat = BERLIN_POSITION.lat,
			lng = BERLIN_POSITION.lng,
			zoom = BERLIN_POSITION.zoom,
		} = (this.queryParams() as IMapPosition) ?? {};

		return { ...BERLIN_POSITION, lat, lng, zoom };
	});
	public readonly markers = input.required<Layer[]>();
	public readonly lastRun = input<Date>();

	protected readonly _mapOptions: MapOptions = {
		zoom: this.leafletPosition().zoom,
		center: latLng(this.leafletPosition().lat, this.leafletPosition().lng),
		layers: [BASE_MAP_LAYER[EBaseLayerTypes.OSM_HOT]],
		preferCanvas: true,
	};
	protected readonly _layerControl = DEFAULT_LAYER_CONFIG;

	/**
	 * Contains the base layer with all markers
	 */
	protected readonly _markersWithLayer$: Signal<Layer[]> = computed(() => {
		const layers: Layer[] = this.markers() || [];
		return layers;
	});

	protected onMapChange(event: LeafletEvent) {
		const center = event.sourceTarget.getCenter();
		const zoom = event.sourceTarget.getZoom();
		this.router.navigate([], {
			queryParams: { lat: center.lat, lng: center.lng, zoom },
			queryParamsHandling: 'merge',
		});
	}
}
