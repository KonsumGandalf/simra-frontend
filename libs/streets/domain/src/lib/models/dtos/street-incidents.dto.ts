import { ValidateNested } from 'class-validator';
import { IncidentDto } from '@simra/incidents-models';

export class StreetIncidentsDto {
	@ValidateNested({each: true})
	incidents: IncidentDto[] = [];
}
