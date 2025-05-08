import { IEnrichedRegion, IRegionMap } from '@simra/streets-common';
import { FeatureCollection, Geometry } from 'geojson';

export class SetRegionCollection {
	static readonly type = '[RegionMap] Region Grid';
	constructor(public batch: FeatureCollection<Geometry, IEnrichedRegion>) {}
}

export class SetEnrichedRegions {
	static readonly type = '[RegionMap] Enriched Region Grid';
	constructor(public batch: IEnrichedRegion[]) {}
}

export class SetRegions {
	static readonly type = '[RegionMap] Set Region';
	constructor(public batch: IRegionMap[]) {}
}

export class SetRegionSafetyMetrics {
	static readonly type = '[RegionMap] Set Safety Metrics';
	constructor(public batch: Map<number, string>) {}
}

