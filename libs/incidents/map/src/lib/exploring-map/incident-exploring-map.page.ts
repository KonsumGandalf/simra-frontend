import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	Signal,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { MapComponent } from '@simra/common-components';
import { ExploringMapFacade } from '@simra/incidents-domain';
import { Layer, marker } from 'leaflet';
import { map } from 'rxjs';

@Component({
	selector: 'simra-rides-incident-exploring-map',
	imports: [CommonModule, LeafletModule, MapComponent],
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

	private readonly _incidents$ = toSignal(
		this._exploringMapFacade.getIncidents().pipe(
			map((incidents) =>
				incidents
					.filter((incident) => incident.lat != 0 && incident.lng != 0)
					.map((incident) => ({
						lat: incident.lat,
						lng: incident.lng,
						label: incident.description,
					})),
			),
		),
	);

	protected readonly _markers$: Signal<Layer[]> = computed(() => {
		const incidents = this._incidents$() || [];

		return incidents.map((incident) =>
			marker([incident.lat, incident.lng], { title: incident.label }),
		);
	});
}
