import { IRegionMap } from '../interfaces/region-map.interface';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class RegionMapDto implements IRegionMap {
	@IsString()
	name: string;

	@Expose({name: 'admin_level'})
	@IsNumber()
	adminLevel: number;

	@IsString()
	way: string;
}
