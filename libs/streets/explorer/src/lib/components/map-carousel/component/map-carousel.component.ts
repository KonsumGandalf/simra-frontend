import {
	ApplicationRef,
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	Injector, signal,
	Signal,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { createIncidentMarker } from '@simra/incidents-ui';
import { StreetDetailState } from '@simra/streets-domain';
import { along, length, lineString } from '@turf/turf';
import { latLng, Layer, polyline } from 'leaflet';
import { TabList, TabPanels, TabsModule } from 'primeng/tabs';
import proj4 from 'proj4';
import { times } from 'lodash';
import { MapPage } from '@simra/common-components';
import { MapillaryComponent } from '../../mapillar/component/mapillary.component';

@Component({
	selector: 'm-map-carousel',
	imports: [
		TabsModule,
		CommonModule,
		MapillaryComponent,
		TabList,
		TabPanels,
		MapPage
	],
	templateUrl: './map-carousel.component.html',
	styleUrl: './map-carousel.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'm-map-carousel',
	},
})
export class MapCarouselComponent {
	private readonly _store = inject(Store);
	private readonly _router = inject(Router);
	private readonly _injector = inject(Injector);
	private readonly _appRef = inject(ApplicationRef);

	protected readonly _street$ = this._store.selectSignal(StreetDetailState.getStreet);
	protected readonly _safetyMetrics$ = this._store.selectSignal(
		StreetDetailState.getSelectedSafetyMetrics,
	);
	protected readonly _incidents$ = this._store.selectSignal(
		StreetDetailState.getSelectedIncidents,
	);

	protected readonly _geometries$: Signal<Layer[]> = computed(() => {
		const street = this._street$();
		const safetyMetrics = this._safetyMetrics$();
		if (!street) {
			return;
		}

		const convertedCoordinates = street.way.coordinates
			.map((coordinate) => proj4('EPSG:3857', 'EPSG:4326', [coordinate[0], coordinate[1]]))
			.map(([lng, lat]) => [lat, lng]);

		const latLngs = convertedCoordinates.map(([lat, lng]) => latLng(lat, lng));

		const streetLine = polyline(latLngs, { color: safetyMetrics.dangerousColor });
		const line = lineString(convertedCoordinates);
		const midpoint = along(line, length(line) / 2);
		const center = midpoint.geometry.coordinates;
		this._router.navigate([], {
			queryParams: { lat: center[0], lng: center[1], zoom: 16 },
			queryParamsHandling: 'merge',
		});

		const incidents = this._incidents$();
		let incidentsMarkers = [];
		if (incidents) {
			incidentsMarkers = this._incidents$().map((incident) => {
				return createIncidentMarker(incident, this._injector, this._appRef);
			});
		}

		return [...incidentsMarkers, streetLine];
	});

	protected hasMapillaryImage = signal<boolean>(false);

	protected readonly times = times;
}
