import { ETrafficTimes, EWeekDays, EYear } from '@simra/common-models';
import { IsEnum, IsHexColor, IsNumber } from 'class-validator';
import { ISafetyMetrics } from '../interfaces/safety-metrics.interface';

export class SafetyMetricsDto implements ISafetyMetrics {
	@IsNumber()
	osmId: number;

	@IsNumber()
	numberOfRides: number;

	@IsNumber()
	numberOfIncidents: number;

	@IsNumber()
	numberOfScaryIncidents: number;

	@IsNumber()
	dangerousScore: number

	@IsNumber()
	numberOfClosePasses: number;

	@IsNumber()
	numberOfPullInOuts: number;

	@IsNumber()
	numberOfNearLeftRightHooks: number;

	@IsNumber()
	numberOfHeadOnApproaches: number;

	@IsNumber()
	numberOfTailgating: number;

	@IsNumber()
	numberOfNearDoorings: number;

	@IsNumber()
	numberOfObstacleDodges: number;

	@IsHexColor()
	dangerousColor: string;

	@IsNumber()
	planetOsmLine: number;

	@IsEnum(ETrafficTimes)
	trafficTime: ETrafficTimes;

	@IsEnum(EWeekDays)
	weekDay: EWeekDays;

	@IsEnum(EYear)
	year: EYear;
}
