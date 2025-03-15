import { EHighwayTypes, ETrafficTimes, EWeekDays } from '@simra/common-models';
import { IStreetsSafetyMetrics } from '@simra/streets-common';
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class StreetsSafetyMetricsDto implements IStreetsSafetyMetrics {
	@IsNumber()
	id: number;

	@IsString()
	name: string;

	@IsOptional()
	@IsEnum(EHighwayTypes)
	highway: EHighwayTypes;

	@IsNumber()
	dangerousScore: number;

	@IsString()
	dangerousColor: string;

	@IsNumber()
	numberOfRides: number;

	@IsNumber()
	numberOfIncidents: number;

	@IsEnum(ETrafficTimes)
	trafficTime: ETrafficTimes;

	@IsEnum(EWeekDays)
	weekDay: EWeekDays;
}

export class StreetsSafetyMetricsResponseDto {
	@ValidateNested({ each: true })
	streets: StreetsSafetyMetricsDto[];
}
