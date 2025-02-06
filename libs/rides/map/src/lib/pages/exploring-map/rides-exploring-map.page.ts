import { CommonModule } from '@angular/common';
import {
	ApplicationRef,
	ChangeDetectionStrategy,
	Component,
	computed,
	inject, Injector,
	model, Signal,
	ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { MapPage } from '@simra/common-components';
import { asyncComputed } from '@simra/common-utils';
import { createIncidentMarker } from '@simra/incidents-ui';
import { RidesExploringFacade } from '@simra/rides-domain';
import { along, length, lineString } from '@turf/turf';

import { geoJSON, Layer} from 'leaflet';
import { Card } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';

@Component({
	selector: 'p-streets-exploring-map',
	imports: [CommonModule, LeafletModule, MapPage, FormsModule, InputNumber, Card],
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
	private readonly _router = inject(Router);
	private readonly _ridesExploringFacade = inject(RidesExploringFacade);
	private readonly _injector = inject(Injector);
	private readonly _appRef = inject(ApplicationRef);

	protected _counter = model<number>(1);
	protected readonly _ridesGeometries$ = asyncComputed(() => {
		let counter = this._counter();

		if (counter === undefined) {
			counter = 1;
			this._counter.set(1);
		}

		return this._ridesExploringFacade.getRideGeometries(counter);
	});


	protected readonly _geometries$: Signal<Layer[]> = computed(() => {
		const incidents = this._ridesGeometries$();

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
		console.log(incidents.incidentLocations);
		const incidentMarkers = incidents.incidentLocations.map((incident) =>{
			return createIncidentMarker(incident, this._injector, this._appRef, this._ridesExploringFacade.getIncidentDetails.bind(this._ridesExploringFacade))
			}
		);
		const lineStringJSON = JSON.parse(incidents.visitedWay);
		const line = lineString(lineStringJSON.coordinates);
		const midpoint = along(line, length(line) / 2);
		const center = midpoint.geometry.coordinates;
		this._router.navigate([], {
			queryParams: { lat: center[1], lng: center[0], zoom: 14 },
			queryParamsHandling: 'merge',
		})
		return [visitedWay, ...assignedWays, ...incidentWays, ...incidentMarkers];
	});
	
	
}


