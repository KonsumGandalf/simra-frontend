import { IncidentDto } from '@simra/incidents-models';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

class EmbeddedRideIncidentResponseDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => IncidentDto)
	rideIncidents: IncidentDto[] = [];
}

export class RideIncidentsResponseDto {
	@ValidateNested()
	@Type(() => EmbeddedRideIncidentResponseDto)
	_embedded!: EmbeddedRideIncidentResponseDto;
}
