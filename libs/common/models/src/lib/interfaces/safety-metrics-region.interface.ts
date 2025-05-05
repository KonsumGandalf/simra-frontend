import { ISafetyMetrics } from './safety-metrics.interface';

/**
 * The safety metrics of a region of osm
 */
export interface ISafetyMetricsRegion extends ISafetyMetrics {
	name: string;
	totalDistance: number;
}
