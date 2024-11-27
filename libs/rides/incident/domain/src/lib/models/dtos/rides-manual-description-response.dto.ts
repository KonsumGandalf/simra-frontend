import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { RideManualDescriptionDto } from './ride-manual-description.dto';

class EmbeddedRidesManualDescriptionResponseDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RideManualDescriptionDto)
	rideManualDescriptions: RideManualDescriptionDto[] = [];
}


export class RidesManualDescriptionResponseDto {
	@ValidateNested()
	@Type(() => EmbeddedRidesManualDescriptionResponseDto)
	_embedded!: EmbeddedRidesManualDescriptionResponseDto;
}