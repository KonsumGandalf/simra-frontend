import { ISafetyMetrics } from './safety-metrics.interface';

export interface ISafetyMetricsStreet extends ISafetyMetrics {
	osmId: number;
}
