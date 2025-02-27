import { ETrafficTimes, EWeekDays } from '@simra/common-models';

export interface ISafetyMetrics {
	planetOsmLineId: number;
	trafficTime: ETrafficTimes;
	weekDay: EWeekDays;
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
