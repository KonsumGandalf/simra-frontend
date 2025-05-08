import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { IStreetGrid } from '../interfaces/street-grid.interface';

export class StreetGridDto implements IStreetGrid {
	@IsString()
	highway: string;

	@Expose({name: 'osm_id'})
	@IsNumber()
	osmId: number;

	@IsString()
	way: string;
}
