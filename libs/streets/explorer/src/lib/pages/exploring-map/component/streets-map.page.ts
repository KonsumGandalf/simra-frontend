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
import { DangerousScoreBarComponent, MapPage, SafetyMetricsDigitPanelComponent } from '@simra/common-components';
import { MapPositionInterface } from '@simra/common-models';
import { MapFilterState } from '@simra/common-state';
import { asyncComputed } from '@simra/common-utils';
import { createIncidentMarker } from '@simra/incidents-ui';

import { IGetStreetGrid } from '@simra/streets-common';
import { SetStreet, StreetDetailState, StreetMapState, StreetsMapFacade } from '@simra/streets-domain';
import { Marker } from 'leaflet';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'streets-map',
	imports: [
		CommonModule,
		LeafletModule,
		MapPage,
		DangerousScoreBarComponent,
		SafetyMetricsDigitPanelComponent,
	],
	templateUrl: './streets-map.page.html',
	styleUrl: './streets-map.page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'o-streets-map',
	},
})
export class StreetsMapPage {
	private readonly _streetsMapFacade = inject(StreetsMapFacade);
	private readonly _store = inject(Store);
	private readonly _injector = inject(Injector);
	private readonly _appRef = inject(ApplicationRef);

	private _mapPosition = signal<MapPositionInterface>(undefined);
	protected readonly _filterState = this._store.selectSignal(MapFilterState.getMapFilterState);
	protected readonly streets$ = this._store.selectSignal(StreetMapState.getStreetCache);
	protected readonly hoveredStreetId$ = this._store.selectSignal(
		StreetDetailState.getStreet,
	);

	protected readonly incidents$ = asyncComputed(() => {
		const hoveredStreet = this.hoveredStreetId$();
		if (hoveredStreet === undefined) {
			return undefined;
		}

		return firstValueFrom(this._streetsMapFacade.fetchIncidentsForStreet(hoveredStreet.id));
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
		this._store.dispatch(new SetStreet(undefined));

		effect(async () => {
			const lp = this._mapPosition();
			const filter = this._filterState();

			if (!lp || !filter) {
				return;
			}

			await this._streetsMapFacade.fetchStreetInformation({
				...filter,
				...lp,
			} as IGetStreetGrid);
		});
	}

	onMapPositionChanged(position: MapPositionInterface) {
		this._mapPosition.set(position);
	}
}
