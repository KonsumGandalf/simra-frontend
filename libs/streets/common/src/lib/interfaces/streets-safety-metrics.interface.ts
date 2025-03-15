import { ISafetyMetrics } from './safety-metrics.interface';

export interface IStreetsSafetyMetrics extends ISafetyMetrics {
	/**
	 * The type of the street
	 */
	highway: string;
}
