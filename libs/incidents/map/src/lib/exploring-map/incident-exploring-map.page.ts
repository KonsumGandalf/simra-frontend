import {
	ApplicationRef,
	ChangeDetectionStrategy,
	Component,
	computed,
	inject, Injector,
	Signal,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { MarkerClusterMapPage } from '@simra/common-components';
import { ExploringMapFacade } from '@simra/incidents-domain';
import { createIncidentMarker } from '@simra/incidents-ui';
import { Layer } from 'leaflet';

@Component({
	selector: 'simra-rides-incident-exploring-map',
	imports: [CommonModule, LeafletModule, MarkerClusterMapPage],
	templateUrl: './incident-exploring-map.page.html',
	styleUrl: './incident-exploring-map.page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	host: {
		class: 'o-simra-exploring-map',
	},
})
export class IncidentExploringMapPage {
	private readonly _exploringMapFacade = inject(ExploringMapFacade);
	private readonly _injector = inject(Injector);
	private readonly _appRef = inject(ApplicationRef);

	private readonly _incidents$ = toSignal(
		this._exploringMapFacade.getIncidents()
	);

	protected readonly _markers$: Signal<Layer[]> = computed(() => {
		const incidents = this._incidents$() || [];
		return incidents.map((incident) =>
			createIncidentMarker(incident, this._injector, this._appRef, this._exploringMapFacade.getIncidentDetails.bind(this._exploringMapFacade))
		);
	});
}
