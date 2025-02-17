import { EHighwayTypes, ETrafficTimes, EWeekDays, IRequestPage } from '@simra/common-models';

export interface SafetyMetricsRequest extends IRequestPage {
	/**
	 * The planet osm id of the street
	 */
	id?: number;

	/**
	 * The name of the street
	 */
	name?: string;

	/**
	 * The type of the street
	 */
	highwayTypes?: EHighwayTypes[];

	/**
	 * The minimum dangerous score
	 */
	minDangerousScore?: number;

	/**
	 * The maximum dangerous score
	 */
	maxDangerousScore?: number;

	/**
	 * The minimum number of rides
	 */
	minNumberOfRides?: number;

	/**
	 * The maximum number of rides
	 */
	maxNumberOfRides?: number;

	/**
	 * The time of the traffic
	 */
	trafficTime?: ETrafficTimes[];

	/**
	 * The weekday of the traffic
	 */
	weekDay?: EWeekDays[];
}
