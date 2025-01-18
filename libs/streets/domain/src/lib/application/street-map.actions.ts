import { Geometry } from 'geojson';
import { GeoJSON } from 'leaflet';

export class AddToStreetCache {
	static readonly type = '[StreetMap] Add to street cache';
	constructor(public batch: GeoJSON<any, Geometry>[]) {}
}

export class SetHoveredStreetId {
	static readonly type = '[StreetMap] Set hovered street id';
	constructor(public hoveredStreetId: number | undefined) {}
}
