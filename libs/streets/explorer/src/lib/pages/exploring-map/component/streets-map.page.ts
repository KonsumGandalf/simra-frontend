import { CommonModule } from '@angular/common';
import {
	ApplicationRef,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
	Injector, input, resource,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { DangerousScoreBarComponent, MapPage, SafetyMetricsDigitPanelComponent } from '@simra/common-components';
import { IMapPosition, MapFilterOptionsInterface } from '@simra/common-models';
import { MapFilterState } from '@simra/common-state';
import { asyncComputed } from '@simra/common-utils';
import { createIncidentMarker } from '@simra/incidents-ui';

import { IEnrichedStreet, IGetStreetGrid, IResponseStreet, IStreetGrid } from '@simra/streets-common';
import { RegionMapState, SetStreet, SetStreetIdLoading, StreetDetailState, StreetMapState, StreetsMapFacade } from '@simra/streets-domain';
import loader from '@storybook/builder-webpack5/dist/loaders/export-order-loader';
import { Marker } from 'leaflet';
import { isNil, isEmpty, omitBy, some } from 'lodash';
import { Card } from 'primeng/card';
import { firstValueFrom } from 'rxjs';
import { RegionDetailState } from '@simra/streets-domain';
import { SetRegionName } from '../../../../../../domain/src/lib/application/store/region-detail.action';

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
	standalone: true,
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
	protected readonly streets$ = this._store.selectSignal(StreetMapState.getStreetCollection);
	protected readonly hoveredStreet$ = this._store.selectSignal(StreetDetailState.getStreet);
	protected readonly hoveredRegion$ = this._store.selectSignal(RegionDetailState.getRegionName);
	protected readonly rawStreetGrid = this._store.selectSignal(StreetMapState.getEnrichedStreets);
	protected readonly regionCollection$ = this._store.selectSignal(RegionMapState.getRegionCollection);
	protected readonly lastSafetyMetrics$ = signal<any>(null);

	protected readonly safetyMetricsStreets$ = resource({
		request: () => {
			const street = this.hoveredStreet$();
			const filter = this._filterState();

			return { street, filter };
		},
		loader: async ({ request }) => {
			const { street, filter } = request;
			if (!street || !filter) {
				return;
			}

			const safetyMetrics = await firstValueFrom(
				this._streetsMapFacade.fetchSafetyMetricsForStreet(street.id, filter),
			);

			this.showOverlay$.set(false);
			this.lastSafetyMetrics$.set(safetyMetrics);
		},
	});
	protected readonly safetyMetricsRegion$ = resource({
		request: () => {
			const regionName = this.hoveredRegion$();
			const filter = this._filterState();

			return { regionName, filter };
		},
		loader: async ({ request }) => {
			const { regionName, filter } = request;

			if (!regionName || !filter) {
				return;
			}

			const safetyMetrics = await firstValueFrom(
				this._streetsMapFacade.fetchSafetyMetricsForRegion(regionName, filter),
			);

			this.showOverlay$.set(false);
			this.lastSafetyMetrics$.set(safetyMetrics);
		},
	});

	protected readonly showOverlay$ = signal(true);
	protected readonly lastRun$ = toSignal(
		this._streetsMapFacade.fetchLastMethodRun('calculateSafetyMetricsHighway'),
	);

	protected readonly incidents$ = asyncComputed(() => {
		const hoveredStreet = this.hoveredStreet$();
		const filter = this._filterState();
		if (hoveredStreet === undefined) {
			return undefined;
		}

		return firstValueFrom(
			this._streetsMapFacade.fetchIncidentsForStreet(hoveredStreet.id, filter),
		);
	});

	constructor() {
		this._store.dispatch(new SetStreet(undefined));
		this._streetsMapFacade.fetchStreetGrid();
		this._streetsMapFacade.fetchRegionMap();
	}

	safetyMetricsStreets = resource({
		request: () => this._filterState(),
		loader: async ({ request }) => {
			const filter = request;

			if (!filter || isEmpty(omitBy(filter, isEmpty))) {
				return;
			}

			await firstValueFrom(
				this._streetsMapFacade.updateMap(filter),
			);

			await firstValueFrom(
				this._streetsMapFacade.updateRegionMap(filter),
			)
		},
	});

	onMapPositionChanged(position: IMapPosition) {
		this._mapPosition.set(position);
	}

	async onStreetSelected(id: number) {
		this._store.dispatch(new SetStreet({ id } as IResponseStreet));
	}

	async onRegionSelected(name: string) {
		this._store.dispatch(new SetRegionName({ name }));
	}

	incidents = resource({
		request: () => this.hoveredStreet$(),
		loader: async ({ request }) => {
			if (!request) {
				return;
			}

			return await firstValueFrom(
				this._streetsMapFacade.fetchIncidentsForStreet(request.id, this._filterState()),
			);
		},
	})
}
