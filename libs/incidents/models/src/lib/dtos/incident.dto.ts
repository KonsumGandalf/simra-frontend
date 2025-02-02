import { EBikeType, EIncidentType, EParticipants, EPhoneLocations } from '../enums/public-api';
import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

import { IncidentInterface } from '../interfaces/incident.interface';

export class IncidentDto implements IncidentInterface {
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
}
