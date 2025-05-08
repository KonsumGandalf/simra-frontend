import { EventEmitter } from '@angular/core';
import { EMapViewMode } from '../enum/map-view-mode.enum';
import { polygonLayerLarge, polygonLayerMedium, polygonSource } from '../const';
import { changeCursor } from './map.utils';

export function addPolygonLayer(mlMap, data, regionSelected: EventEmitter<string>, viewMode: EMapViewMode) {
	if (viewMode === EMapViewMode.DEFAULT) {
		const source = mlMap.getSource(polygonSource);
		if (!source) {
			mlMap.addSource(polygonSource, {
				type: 'geojson',
				data: data,
			});

			mlMap.addLayer({
				id: polygonLayerMedium,
				type: 'fill',
				source: polygonSource,
				paint: {
					'fill-color': ['get', 'dangerousColor'],
					'fill-opacity': 0.5,
				},
				filter: ['>=', ['get', 'adminLevel'], 6],
				maxzoom: 11,
				minzoom: 8,
			});

			mlMap.on('click', polygonLayerMedium, (e) => {
				regionSelected.emit(e.features?.[0].properties?.name);
				console.log('Region clicked:', e.features?.[0]);
			});
			changeCursor(mlMap, polygonLayerMedium);

			mlMap.addLayer({
				id: polygonLayerLarge,
				type: 'fill',
				source: polygonSource,
				paint: {
					'fill-color': ['get', 'dangerousColor'],
					'fill-opacity': 0.5,
				},
				filter: ['==', [ 'get', 'adminLevel' ], 4],
				maxzoom: 8,
			});

			changeCursor(mlMap, polygonLayerLarge);

			mlMap.on('click', polygonLayerLarge, (e) => {
				regionSelected.emit(e.features?.[0].properties?.name);
				console.log('Region clicked:', e.features?.[0]);
			});
		} else {
			source.setData(data)
		}
	}
	else if (viewMode === EMapViewMode.REGION) {
		console.log('addPolygonLayer', data);
		mlMap.addSource(polygonSource, {
			type: 'geojson',
			data: data,
		});

		mlMap.addLayer({
			id: polygonLayerMedium,
			type: 'fill',
			source: polygonSource,
			paint: {
				'fill-color': ['get', 'dangerousColor'],
				'fill-opacity': 0.5,
			},
		});

		changeCursor(mlMap, polygonLayerMedium);
	}

}
