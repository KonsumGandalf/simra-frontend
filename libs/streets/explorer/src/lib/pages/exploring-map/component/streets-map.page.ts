import { CommonModule } from '@angular/common';
import {
	ApplicationRef,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
	Injector, resource,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { DangerousScoreBarComponent, MapPage, SafetyMetricsDigitPanelComponent } from '@simra/common-components';
import { IMapPosition } from '@simra/common-models';
import { MapFilterState } from '@simra/common-state';
import { asyncComputed } from '@simra/common-utils';
import { createIncidentMarker } from '@simra/incidents-ui';

import { IGetStreetGrid } from '@simra/streets-common';
import { SetStreet, StreetDetailState, StreetMapState, StreetsMapFacade } from '@simra/streets-domain';
import { Marker } from 'leaflet';
import { Card } from 'primeng/card';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'streets-map',
	imports: [
		CommonModule,
		LeafletModule,
		MapPage,
		DangerousScoreBarComponent,
		SafetyMetricsDigitPanelComponent,
		Card,
		TranslatePipe,
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

	protected _mapPosition = signal<IMapPosition>(undefined);
	protected readonly _filterState = this._store.selectSignal(MapFilterState.getMapFilterState);
	protected readonly streets$ = this._store.selectSignal(StreetMapState.getStreetCache);
	protected readonly hoveredStreetId$ = this._store.selectSignal(StreetDetailState.getStreet);
	protected readonly safetyMetrics$ = resource({
		request: () => this.hoveredStreetId$(),
		loader: async ({ request }) => {
			const safetyMetrics = await firstValueFrom(this._streetsMapFacade.fetchSafetyMetricsForStreet(request.id));
			this.showOverlay$.set(false);
			return safetyMetrics;
		}
	});
	protected readonly showOverlay$ = signal(true);
	protected readonly lastRun$ = toSignal(
		this._streetsMapFacade.fetchLastMethodRun('updateSafetyMetricsHighway'),
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

	onMapPositionChanged(position: IMapPosition) {
		this._mapPosition.set(position);
	}
}
