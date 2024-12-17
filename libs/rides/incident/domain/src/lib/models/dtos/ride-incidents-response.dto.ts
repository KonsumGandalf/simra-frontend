import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { RideIncidentDto } from './ride-incident.dto';

class EmbeddedRideIncidentResponseDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RideIncidentDto)
	rideIncidents: RideIncidentDto[] = [];
}


export class RideIncidentsResponseDto {
	@ValidateNested()
	@Type(() => EmbeddedRideIncidentResponseDto)
	_embedded!: EmbeddedRideIncidentResponseDto;
}
