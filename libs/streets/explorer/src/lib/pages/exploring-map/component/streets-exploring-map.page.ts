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
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Store } from '@ngxs/store';
import { DangerousScoreBarComponent, MapPage } from '@simra/common-components';
import { MapPositionInterface } from '@simra/common-models';
import { MapFilterState } from '@simra/common-state';
import { asyncComputed } from '@simra/common-utils';
import { createIncidentMarker } from '@simra/incidents-ui';

import { IGetStreetGrid } from '@simra/streets-common';
import { StreetMapState, StreetsExploringMapFacade } from '@simra/streets-domain';
import { Marker } from 'leaflet';
import { firstValueFrom } from 'rxjs';
import { SafetyMetricsPanelComponent } from '../../../components/safety-metrics-panel/component/safety-metrics-panel.component';

@Component({
	selector: 'simra-streets-exploring-map',
	imports: [
		CommonModule,
		LeafletModule,
		MapPage,
		SafetyMetricsPanelComponent,
		DangerousScoreBarComponent,
	],
	templateUrl: './streets-exploring-map.page.html',
	styleUrl: './streets-exploring-map.page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'o-simra-exploring-map',
	},
})
export class StreetsExploringMapPage {
	private readonly _exploringMapFacade = inject(StreetsExploringMapFacade);
	private readonly _store = inject(Store);
	private readonly _injector = inject(Injector);
	private readonly _appRef = inject(ApplicationRef);

	private _mapPosition = signal<MapPositionInterface>(undefined);
	protected readonly _filterState = this._store.selectSignal(MapFilterState.getMapFilterState);
	protected readonly streets$ = this._store.selectSignal(StreetMapState.getStreetCache);
	protected readonly hoveredStreetId$ = this._store.selectSignal(
		StreetMapState.getHoveredStreetId,
	);

	protected readonly incidents$ = asyncComputed(() => {
		const hoveredStreet = this.hoveredStreetId$();
		if (hoveredStreet === undefined) {
			return undefined;
		}

		return firstValueFrom(this._exploringMapFacade.fetchIncidentsForStreet(hoveredStreet));
	});
	public readonly combinedOverlay$ = computed(() => {
		let incidentsMarker: Marker[] = [];
		const incidents = this.incidents$();
		if (incidents) {
			incidentsMarker = this.incidents$().map((incident) => {
				return createIncidentMarker(incident, this._injector, this._appRef);
			});
		}

		return [...incidentsMarker, ...this.streets$()];
	});

	constructor() {
		effect(() => {
			const lp = this._mapPosition() ?? { lat: 52.522, lng: 13.413, zoom: 14 };
			const filter = this._filterState();
			this._exploringMapFacade.fetchStreetInformation({
				...filter,
				...lp,
			} as IGetStreetGrid);
		});
	}

	onMapPositionChanged(position: MapPositionInterface) {
		this._mapPosition.set(position);
	}
}
