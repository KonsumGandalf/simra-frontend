import { CommonModule } from '@angular/common';
import {
	ApplicationRef,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
	model,
	ModelSignal, Signal,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Store } from '@ngxs/store';
import { MapComponent } from '@simra/common-components';
import { MapPositionInterface } from '@simra/common-models';
import { asyncComputed } from '@simra/common-utils';
import { RidesExploringFacade } from '@simra/rides-domain';

import { geoJSON, Layer} from 'leaflet';
import { Card } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';

@Component({
	selector: 'p-streets-exploring-map',
	imports: [CommonModule, LeafletModule, MapComponent, FormsModule, InputNumber, Card],
	templateUrl: './rides-exploring-map.page.html',
	styleUrl: './rides-exploring-map.page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	host: {
		class: 'p-streets-exploring-map',
	},
})
export class RidesExploringMapPage {
	private readonly _ridesExploringFacade = inject(RidesExploringFacade);

	protected _counter = model<number>();
	protected readonly _mapPosition: ModelSignal<MapPositionInterface> = model({
		lat: 52.522,
		lng: 13.413,
		zoom: 14,
	});
	protected readonly _ridesGeometries$ = asyncComputed(() => {
		const counter = this._counter();

		if (counter === undefined) {
			this._counter.set(1);
		}

		return this._ridesExploringFacade.getRideGeometries(counter);
	});

	protected readonly _geometries$: Signal<Layer[]> = computed(() => {
		const incidents = this._ridesGeometries$();
		console.log(incidents);

		if (!incidents) {
			return [];
		}

		const visitedWay = geoJSON(JSON.parse(incidents.visitedWay), {
			style: {
				color: '#FBBF24',
				weight: 3,
			},
		});
		const assignedWays = incidents.assignedWays.map((way) =>
			geoJSON(JSON.parse(way), {
				style: {
					color: '#F97316',
					weight: 3.5,
				},
			}),
		);
		const incidentWays = incidents.incidentWays.map((way) =>
			geoJSON(JSON.parse(way), {
				style: {
					color: '#EF4444',
					weight: 4.5,
				},
			}),
		);
		const incidentMarkers = incidents.incidentLocations.map((incident) =>
			geoJSON(JSON.parse(incident), {
				style: {
					color: '#7C3AED',
					weight: 4,
				},
			}),
		);
		return [visitedWay, ...assignedWays, ...incidentWays, ...incidentMarkers];
	});
}


