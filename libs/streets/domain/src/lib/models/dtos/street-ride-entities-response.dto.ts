import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { RideDto } from './ride.dto';

export class StreetRideEntitiesResponseDto {
	@ValidateNested({ each: true })
	@Type(() => RideDto)
	rides: RideDto[];
}
