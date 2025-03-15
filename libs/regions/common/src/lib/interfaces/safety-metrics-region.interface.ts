import { ISafetyMetrics } from '@simra/common-models';
import { IRegion } from './region.interface';

/**
 * The safety metrics of a region of osm
 */
export interface ISafetyMetricsRegion extends ISafetyMetrics {
	region: IRegion;
	totalDistance: number;
}
