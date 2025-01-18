import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	model,
	ModelSignal,
	ViewEncapsulation,
} from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Store } from '@ngxs/store';
import { MapComponent } from '@simra/common-components';
import { MapPositionInterface } from '@simra/common-models';
import { MapFilterState } from '@simra/common-state';
import { asyncComputed } from '@simra/common-utils';
import { GetStreetInformationInterface } from '@simra/streets-common';
import { StreetMapState, StreetsExploringMapFacade } from '@simra/streets-domain';
import { firstValueFrom } from 'rxjs';
import { SafetyMetricsPanelComponent } from '../../components/safety-metrics-panel/component/safety-metrics-panel.component';

@Component({
	selector: 'simra-streets-exploring-map',
	imports: [CommonModule, LeafletModule, MapComponent, SafetyMetricsPanelComponent],
	templateUrl: './streets-exploring-map.page.html',
	styleUrl: './streets-exploring-map.page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	host: {
		class: 'o-simra-exploring-map',
	},
})
export class StreetsExploringMapPage {
	private readonly _exploringMapFacade = inject(StreetsExploringMapFacade);
	private readonly _store = inject(Store);

	protected readonly _mapPosition: ModelSignal<MapPositionInterface> = model({ lat: 52.522, lng: 13.413, zoom: 14 });
	protected readonly _filterState = this._store.selectSignal(MapFilterState.getMapFilterState);
	protected readonly streets$ = this._store.selectSignal(StreetMapState.getStreetCache);
	protected readonly hoveredStreetId$ = this._store.selectSignal(
		StreetMapState.getHoveredStreetId,
	);
	protected readonly safetyMetrics$ = asyncComputed(() => {
		const hoveredStreet = this.hoveredStreetId$();
		if (hoveredStreet === undefined) {
			return undefined;
		}

		return firstValueFrom(this._exploringMapFacade.fetchSafetyMetricsForStreet(hoveredStreet));
	});

	constructor() {
		effect(() => {
			const lp = this._mapPosition() ?? { lat: 52.522, lng: 13.413, zoom: 14 };
			const filter = this._filterState();
			this._exploringMapFacade.fetchStreetInformation({...filter, ...lp} as GetStreetInformationInterface);
		});
	}
}


