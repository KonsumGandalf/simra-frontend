import { rideLanesLayer, rideMarkerLayer, rideSource } from '../const';
import { EPin } from '../pin-enum';
import { changeCursor, removeLayer, removeSource } from './map.utils';

export function addRideLayer(mlMap, data){
	removeLayer(mlMap, rideLanesLayer);
	removeLayer(mlMap, rideMarkerLayer);
	removeSource(mlMap, rideSource);

	mlMap.addSource(rideSource, {
		type: 'geojson',
		data: data,
	});

	mlMap.addLayer({
		id: rideLanesLayer,
		type: 'line',
		source: rideSource,
		paint: {
			'line-color': ['get', 'dangerousColor'],
			'line-width': ['get', 'width'],
		},
		filter: ['==', '$type', 'LineString']
	});
	mlMap.addLayer({
		id: rideMarkerLayer,
		type: 'symbol',
		source: rideSource,
		filter: ['==', '$type', 'Point'],
		layout: {
			'icon-allow-overlap': true,
			'icon-ignore-placement': true,
			'icon-image': [
				'case',
				['==', ['get', 'scary'], true],
				EPin.RED,
				EPin.BLUE,
			],
			'icon-size': [
				'interpolate',
				['linear'],
				['zoom'],
				10, 0.1,
				14, 0.15,
				17, 0.3
			]
		},
		paint: {
			'icon-opacity': 1
		}
	});

	changeCursor(mlMap, rideLanesLayer);

	mlMap.on('click', rideLanesLayer, (e) => {
		console.log('Ride clicked:', e.features?.[0]);
	});
}
