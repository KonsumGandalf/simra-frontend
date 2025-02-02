import { EBikeType, EIncidentType, EParticipants, EPhoneLocations } from '../enums/public-api';

export class IncidentInterface {
	id: number;
	lat: number;
	lng: number;
	bike: EBikeType;
	phoneLocation: EPhoneLocations;
	incidentType: EIncidentType;
	description: string;
	scary: boolean;
	participantsInvolved: EParticipants[];
	timeStamp: Date;
}
