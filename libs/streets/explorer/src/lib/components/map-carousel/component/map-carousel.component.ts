import { CommonModule } from '@angular/common';
import {
	ApplicationRef,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
	Injector,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { EMapViewMode, MapPage } from '@simra/common-components';
import { IEnrichedStreet } from '@simra/streets-common';
import { StreetDetailState } from '@simra/streets-domain';
import { along, length, lineString } from '@turf/turf';
import { times } from 'lodash';
import { TabList, TabPanels, TabsModule } from 'primeng/tabs';
import proj4 from 'proj4';
import { MapillaryComponent } from '../../mapillar/component/mapillary.component';

@Component({
	selector: 'm-map-carousel',
	imports: [
		TabsModule,
		CommonModule,
		MapillaryComponent,
		TabList,
		TabPanels,
		MapPage,
		TranslatePipe,
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

	protected readonly convertedCoordinates = computed(() => {
		const street = this._street$();
		if (!street) {
			return;
		}

		return street.way.coordinates
			.map((coordinate) => proj4('EPSG:3857', 'EPSG:4326', [coordinate[0], coordinate[1]]))
			.map(([lng, lat]) => [lat, lng]);
	});

	protected readonly _streets$ = computed<IEnrichedStreet[]>(() => {
		const street = this._street$();
		const safetyMetrics = this._safetyMetrics$();
		const convertedCoordinates = this.convertedCoordinates();

		if (!street) {
			return [];
		}

		const way = {
			type: 'LineString',
			coordinates: convertedCoordinates.map(([lat, lng]) => [lng, lat]),
		};

		return [
			{
				highway: street.highway,
				way: JSON.stringify(way),
				osmId: street.id,
				dangerousColor: safetyMetrics.dangerousColor,
			} as IEnrichedStreet,
		];
	});

	constructor() {
		effect(() => {
			const convertedCoordinates = this.convertedCoordinates();
			if (!convertedCoordinates) {
				return;
			}

			const line = lineString(convertedCoordinates);
			const midpoint = along(line, length(line) / 2);
			const center = midpoint.geometry.coordinates;
			this._router.navigate([], {
				queryParams: { lat: center[0], lng: center[1], zoom: 16, isNavigated: true },
				queryParamsHandling: 'merge',
				replaceUrl: true,
			});
		});
	}

	protected hasMapillaryImage = signal<boolean>(false);

	protected readonly times = times;
	protected readonly EMapViewMode = EMapViewMode;
}
