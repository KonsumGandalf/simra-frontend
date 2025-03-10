import { ETrafficTimes, EWeekDays, EYear } from '@simra/common-models';

export interface ISafetyMetrics {
	osmId: number;
	trafficTime: ETrafficTimes;
	weekDay: EWeekDays;
	year: EYear;
	dangerousColor: string;
	numberOfRides: number;
	numberOfIncidents: number;
	numberOfScaryIncidents: number;
	dangerousScore: number;
	numberOfClosePasses: number;
	numberOfPullInOuts: number;
	numberOfNearLeftRightHooks: number;
	numberOfHeadOnApproaches: number;
	numberOfTailgating: number;
	numberOfNearDoorings: number;
	numberOfObstacleDodges: number;
}
