import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { RideManualDescriptionDto } from './ride-manual-description.dto';

export class RidesManualDescriptionResponseDto {
	@ValidateNested()
	@Type(() => EmbeddedRidesManualDescriptionResponseDto)
	_embedded!: EmbeddedRidesManualDescriptionResponseDto;
}

class EmbeddedRidesManualDescriptionResponseDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RideManualDescriptionDto)
	rideManualDescriptions: RideManualDescriptionDto[] = [];
}
