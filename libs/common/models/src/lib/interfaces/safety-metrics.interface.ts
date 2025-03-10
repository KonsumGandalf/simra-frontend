import { ETrafficTimes, EWeekDays, EYear } from '../enums/public-api';

export interface ISafetyMetrics {
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
