import { CommonModule } from '@angular/common';
import {
	ApplicationRef,
	ChangeDetectionStrategy,
	Component,
	computed, effect,
	inject, Injector,
	model, signal, Signal,
	ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { MapPage } from '@simra/common-components';
import { asyncComputed } from '@simra/common-utils';
import { createIncidentMarker } from '@simra/incidents-ui';
import { RidesFacade } from '@simra/rides-domain';
import { IEnrichedStreet, IEnrichedWithWidth } from '@simra/streets-common';
import { along, length, lineString } from '@turf/turf';
import { FeatureCollection, Geometry } from 'geojson';

import { geoJSON, Layer} from 'leaflet';
import { isEmpty } from 'lodash';
import { Card } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';


@Component({
    selector: 'p-streets-exploring-map',
    imports: [CommonModule, LeafletModule, MapPage, FormsModule, InputNumber, Card],
    templateUrl: './rides-map.page.html',
    styleUrl: './rides-map.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-rides-map',
    }
})
export class RidesMapPage {
	private readonly _router = inject(Router);
	private readonly _ridesExploringFacade = inject(RidesFacade);
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

	constructor() {
		effect(() => {
			const rides = this._ridesGeometries$();

			if (!rides) {
				return;
			}

			const lineStringJSON = JSON.parse(rides.visitedWay);
			const line = lineString(lineStringJSON.coordinates);
			const midpoint = along(line, length(line) / 2);
			const center = midpoint.geometry.coordinates;
			this._router.navigate([], {
				queryParams: { lat: center[1], lng: center[0], zoom: 12, isNavigated: true },
				queryParamsHandling: 'merge',
				replaceUrl: true,
			})
		});
	}

	protected readonly _rideFeatureCollection$ = computed(() => {
		const geometries = this._ridesGeometries$();

		if(!geometries) {
			return;
		}

		const ways: Partial<IEnrichedWithWidth>[] = [{
			way: geometries.visitedWay,
			dangerousColor: '#FBBF24',
			width: 2
		}];
		for (const way of geometries.assignedWays) {
			ways.push({
				way: way,
				width: 3,
				dangerousColor: '#F97316',
			});
		}
		for (const way of geometries.incidentWays) {
			ways.push({
				way: way,
				width: 5,
				dangerousColor: '#EF4444',
			});
		}
		const lineFeatures = ways.map((l) => ({
			type: 'Feature',
			geometry: JSON.parse(`${l.way}`),
			properties: {
				dangerousColor: l.dangerousColor,
				type: 'line',
				width: l.width,
			},
		}));

		const markerFeatures = geometries.incidentLocations.map((m) => ({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [m.lng, m.lat],
			},
			properties: {
				id: m.id,
				scary: m.scary,
				type: 'marker',
			},
		}));

		return {
			type: 'FeatureCollection',
			features: [...lineFeatures, ...markerFeatures],
		} as  FeatureCollection<Geometry, any> | undefined;
	});

}
