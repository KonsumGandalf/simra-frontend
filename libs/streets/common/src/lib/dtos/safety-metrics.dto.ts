import { ETrafficTimes, EWeekDays, EYear, ISafetyMetricsStreet } from '@simra/common-models';
import { IsEnum, IsHexColor, IsNumber } from 'class-validator';

export class SafetyMetricsDto implements ISafetyMetricsStreet {
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
