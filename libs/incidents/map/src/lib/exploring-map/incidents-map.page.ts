import {
	ApplicationRef,
	ChangeDetectionStrategy,
	Component,
	computed, effect,
	inject, Injector,
	Signal,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Store } from '@ngxs/store';
import { IncidentsMapFacade, IncidentsState} from '@simra/incidents-domain';
import { createIncidentMarker } from '@simra/incidents-ui';
import { Layer } from 'leaflet';
import { firstValueFrom } from 'rxjs';
import { MarkerClusterMapPage } from '@simra/common-components';

@Component({
	selector: 'incident-map',
	imports: [CommonModule, LeafletModule, MarkerClusterMapPage],
	templateUrl: './incidents-map.page.html',
	styleUrl: './incidents-map.page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'o-incidents-map',
	},
})
export class IncidentsMapPage {
	private readonly _incidentsMapFacade = inject(IncidentsMapFacade);
	private readonly _store = inject(Store);
	private readonly _injector = inject(Injector);
	private readonly _appRef = inject(ApplicationRef);

	private readonly _incidentMarker$ = this._store.selectSignal(IncidentsState.getIncidentMarkers);

	protected readonly _markers$: Signal<Layer[]> = computed(() => {
		const incidents = this._incidentMarker$() || [];
		return incidents.map((incident) =>
			createIncidentMarker(
				incident,
				this._injector,
				this._appRef,
				this._incidentsMapFacade.getIncidentDetails.bind(this._incidentsMapFacade),
			),
		);
	});
	protected readonly _lastRun$ = toSignal(
		this._incidentsMapFacade.fetchLastMethodRun('updateSafetyMetricsHighway'),
	);

	constructor() {
		effect(async () => {
			await firstValueFrom(this._incidentsMapFacade.getIncidentMarker());
		});
	}
}
