import { IsNumber } from 'class-validator';

export class SafetyMetricsDto {
	@IsNumber()
	planetOsmLineId?: number;
	
	@IsNumber()
	numberOfRides?: number;

	@IsNumber()
	numberOfIncidents?: number;

	@IsNumber()
	numberOfScaryIncidents?: number;

	@IsNumber()
	dangerousScore?: number

	@IsNumber()
	numberOfClosePasses?: number;

	@IsNumber()
	numberOfPullInOuts?: number;

	@IsNumber()
	numberOfNearLeftRightHooks?: number;

	@IsNumber()
	numberOfHeadOnApproaches?: number;

	@IsNumber()
	numberOfTailgating?: number;

	@IsNumber()
	numberOfNearDoorings?: number;

	@IsNumber()
	numberOfObstacleDodges?: number;
	
}
