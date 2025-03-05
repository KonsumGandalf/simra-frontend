import { tileLayer, TileLayer } from 'leaflet';
import { EBaseLayerTypes } from '../enums/base-layer-types';

export const BASE_MAP_LAYER: Record<EBaseLayerTypes, TileLayer> = {
	[EBaseLayerTypes.OSM_HOT]: tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>, Tiles style by <a href="https://www.hotosm.org/" target="_blank">H. Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OSM France</a>'
	}),
	[EBaseLayerTypes.OSM_DEFAULT]: tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
		maxZoom: 30,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}),
	[EBaseLayerTypes.GOOGLE]: tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
		maxZoom: 20,
		subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
	}),
}
