import { LeafletControlLayersConfig } from '@bluehalo/ngx-leaflet/lib/layers/control/leaflet-control-layers-config.model';
import { MapPositionInterface } from '@simra/common-models';
import { EBaseLayerTypes } from './enums/base-layer-types';
import { BASE_MAP_LAYER } from './maps/base-map-layer';

export const BERLIN_POSITION: MapPositionInterface = {
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
