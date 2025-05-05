import { ETrafficTimes, EWeekDays, EYear } from '@simra/common-models';
import { IsDate, IsEnum, IsHexColor, IsNumber, IsString } from 'class-validator';
import { ISafetyMetricsRegion } from '@simra/common-models';

export class SafetyMetricsRegionDto implements ISafetyMetricsRegion {
	@IsHexColor()
	dangerousColor: string;

	@IsString()
	dangerousScore: number;

	@IsNumber()
	numberOfClosePasses: number;

	@IsNumber()
	numberOfHeadOnApproaches: number;

	@IsNumber()
	numberOfIncidents: number;

	@IsNumber()
	numberOfNearDoorings: number;

	@IsNumber()
	numberOfNearLeftRightHooks: number;

	@IsNumber()
	numberOfObstacleDodges: number;

	@IsNumber()
	numberOfPullInOuts: number;

	@IsNumber()
	numberOfRides: number;

	@IsNumber()
	numberOfScaryIncidents: number;

	@IsNumber()
	numberOfTailgating: number;

	@IsString()
	name: string;

	@IsEnum(ETrafficTimes)
	trafficTime: ETrafficTimes;

	@IsEnum(EWeekDays)
	weekDay: EWeekDays;

	@IsEnum(EYear)
	year: EYear;

	@IsNumber()
	totalDistance: number;

	@IsDate()
	lastModified: Date;
}
