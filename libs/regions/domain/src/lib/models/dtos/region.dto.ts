import { IRegion } from '@simra/models';
import { IWayPolygon } from '@simra/streets-common';
import { IsNumber, IsString } from 'class-validator';

export class RegionDto implements IRegion {
	@IsString()
	name: string;

	@IsNumber()
	id: number;

	@IsNumber()
	avgSegmentDistance: number;

	@IsString()
	way: IWayPolygon;
}
