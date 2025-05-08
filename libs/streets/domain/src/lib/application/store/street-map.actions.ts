import { IEnrichedStreet, IStreetGrid } from '@simra/streets-common';
import { FeatureCollection, Geometry } from 'geojson';

export class SetStreetCollection {
	static readonly type = '[StreetMap] Street Grid';
	constructor(public batch: FeatureCollection<Geometry, IEnrichedStreet>) {}
}

export class SetEnrichedStreets {
	static readonly type = '[StreetMap] Enriched Street Grid';
	constructor(public batch: IEnrichedStreet[]) {}
}

export class SetStreets {
	static readonly type = '[StreetMap] Set Street';
	constructor(public batch: IStreetGrid[]) {}
}

export class SetStreetSafetyMetrics {
	static readonly type = '[StreetMap] Set Safety Metrics';
	constructor(public batch: Map<number, string>) {}
}

