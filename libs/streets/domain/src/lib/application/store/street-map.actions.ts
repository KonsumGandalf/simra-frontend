import { Geometry } from 'geojson';
import { GeoJSON } from 'leaflet';

export class AddToStreetCache {
	static readonly type = '[StreetMap] Add to street cache';
	constructor(public batch: GeoJSON<any, Geometry>[]) {}
}


