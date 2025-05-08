import { IRegionMap } from './region-map.interface';

export interface IEnrichedRegion extends IRegionMap {
	dangerousColor?: string;
}
