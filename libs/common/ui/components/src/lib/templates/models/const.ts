import { LeafletControlLayersConfig } from '@bluehalo/ngx-leaflet/lib/layers/control/leaflet-control-layers-config.model';
import { IMapPosition } from '@simra/common-models';
import { EBaseLayerTypes } from './enums/base-layer-types';
import { BASE_MAP_LAYER } from './maps/base-map-layer';

export const NUREMBERG_POSITION: IMapPosition = {
	lat: 49.460,
	lng: 11.061,
	zoom: 15
}

export const HANNOVER_POSITION: IMapPosition = {
	lat: 52.374,
	lng: 9.738,
	zoom: 15
}

export const WALLDORF_POSITION: IMapPosition = {
	lat: 49.306,
	lng: 8.64,
	zoom: 13
}

export const HEIDELBERG_POSITION: IMapPosition = {
	lat: 49.398,
	lng: 8.672,
	zoom: 14
}

export const RUHRGEBIET_POSITION: IMapPosition = {
	lat: 51.496,
	lng: 7.413,
	zoom: 13
}

export const WUPPERTAL_POSITION: IMapPosition = {
	lat: 51.256213,
	lng: 7.150763,
	zoom: 14
}

export const MUNICH_POSITION: IMapPosition = {
	lat: 48.135,
	lng: 11.582,
	zoom: 14
}

export const BERLIN_POSITION: IMapPosition = {
	lat: 52.522,
	lng: 13.413,
	zoom: 14
}

export const DEFAULT_LAYER_CONFIG: LeafletControlLayersConfig = {
	baseLayers: {
		[EBaseLayerTypes.OSM_DEFAULT]: BASE_MAP_LAYER[EBaseLayerTypes.OSM_DEFAULT],
		[EBaseLayerTypes.OSM_HOT]: BASE_MAP_LAYER[EBaseLayerTypes.OSM_HOT],
		[EBaseLayerTypes.GOOGLE]: BASE_MAP_LAYER[EBaseLayerTypes.GOOGLE],
	},
	overlays: {}
}
