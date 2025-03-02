import { CommonModule } from '@angular/common';
import { ApplicationRef,
	Component,
	computed,
	inject,
	Injector,
	Signal,
	ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { MapPage } from '@simra/common-components';
import { createIncidentMarker } from '@simra/incidents-ui';
import { StreetDetailState } from '@simra/streets-domain';
import { along, length, lineString } from '@turf/turf';
import { Layer, polyline } from 'leaflet';
import { times } from 'lodash';
import { Card } from 'primeng/card';
import { Skeleton } from 'primeng/skeleton';
import proj4 from 'proj4';
import { CYCLEWAY_LANES_TO_TRANSLATION } from '../../../translations/maps/cycleway-lanes-to-translation.map';
import { HIGHWAY_TYPES_TO_TRANSLATION } from '../../../translations/maps/highway-types-to-translation';
import { PARKING_TO_TRANSLATION } from '../../../translations/maps/street-parking-to-translation.map';

@Component({
	selector: 'm-street-information-card',
	imports: [CommonModule, Card, TranslatePipe, Skeleton, MapPage ],
	templateUrl: './street-information-card.component.html',
	styleUrl: './street-information-card.component.scss',
	host: {
		class: 'm-street-information-card',
	},
	encapsulation: ViewEncapsulation.None,
})
export class StreetInformationCardComponent {
	private readonly _store = inject(Store);
	private readonly _router = inject(Router);
	private readonly _injector = inject(Injector);
	private readonly _appRef = inject(ApplicationRef);

	protected readonly _street$ = this._store.selectSignal(StreetDetailState.getStreet);
	protected readonly _safetyMetrics$ = this._store.selectSignal(
		StreetDetailState.getSelectedSafetyMetrics,
	);
	protected readonly _incidents$ = this._store.selectSignal(StreetDetailState.getSelectedIncidents);

	protected readonly _geometries$: Signal<Layer[]> = computed(() => {
		const street = this._street$();
		const safetyMetrics = this._safetyMetrics$();
		if (!street) {
			return;
		}

		const convertedCoordinates = street.way.coordinates
			.map((coordinate) => proj4('EPSG:3857', 'EPSG:4326', coordinate))
			.map(([lng, lat]) => [lat, lng]);

		const streetLine = polyline(convertedCoordinates, { color: safetyMetrics.dangerousColor });

		const line = lineString(convertedCoordinates);
		const midpoint = along(line, length(line) / 2);
		const center = midpoint.geometry.coordinates;
		this._router.navigate([], {
			queryParams: { lat: center[0], lng: center[1], zoom: 16 },
			queryParamsHandling: 'merge',
		});

		const incidents = this._incidents$()
		let incidentsMarkers = [];
		if (incidents) {
			incidentsMarkers = this._incidents$().map((incident) => {
				return createIncidentMarker(incident, this._injector, this._appRef);
			});
		}

		return [streetLine, ...incidentsMarkers];
	});

	protected readonly times = times;

	protected readonly HIGHWAY_TYPES_TO_TRANSLATION = HIGHWAY_TYPES_TO_TRANSLATION;
	protected readonly CYCLEWAY_LANES_TO_TRANSLATION = CYCLEWAY_LANES_TO_TRANSLATION;
	protected readonly STREET_PARKING_TO_TRANSLATION = PARKING_TO_TRANSLATION;
}
