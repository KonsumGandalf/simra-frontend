import { EHighwayTypes } from '@simra/common-models';
import { ISafetyMetricsRequest } from './request-safety-metrics.interface';

export interface IStreetsSafetyMetricsRequest extends ISafetyMetricsRequest {
	/**
	 * The type of the street
	 */
	highwayTypes?: EHighwayTypes[];
}
