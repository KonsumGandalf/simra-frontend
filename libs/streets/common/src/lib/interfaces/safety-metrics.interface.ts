import { ETrafficTimes, EWeekDays } from '@simra/common-models';

export interface ISafetyMetrics {
	/**
	 * The planet osm id of the street
	 */
	id: number;
	/**
	 * The name of the street
	 */
	name?: string;
	/**
	 * Indicates how dangerous the street is
	 */
	dangerousScore: number;
	/**
	 * The color of the dangerous score
	 */
	dangerousColor: string;
	/**
	 * The number of rides on the street
	 */
	numberOfRides: number;
	/**
	 * The number of accidents on the street
	 */
	numberOfIncidents: number;

	/**
	 * The weekday of the traffic
	 */
	weekDay: EWeekDays;
	/**
	 * The time of the traffic
	 */
	trafficTime: ETrafficTimes;
}
