import { EBikeType, EIncidentType, EParticipants, EPhoneLocations } from '../enums/public-api';
import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

import { IIncident } from '../interfaces/incident.interface';

export class IncidentDto implements IIncident {
	@IsString()
	id: number;

	@IsEnum(EBikeType)
	bike: EBikeType;

	@IsString()
	description: string;

	@IsEnum(EIncidentType)
	incidentType: EIncidentType;

	@IsNumber()
	lat: number;

	@IsNumber()
	lng: number;

	@IsEnum(EParticipants, { each: true })
	participantsInvolved: EParticipants[];

	@IsEnum(EPhoneLocations)
	phoneLocation: EPhoneLocations;

	@IsBoolean()
	scary: boolean;

	@IsDate()
	timeStamp: Date;

	@IsString()
	way: string;
}
