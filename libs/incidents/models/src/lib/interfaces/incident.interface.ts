import { EBikeType, EIncidentType, EParticipants, EPhoneLocations } from '../enums/public-api';
import { IncidentMarkerInterface } from './incident-marker.interface';

export interface IncidentInterface extends IncidentMarkerInterface{
	bike: EBikeType;
	phoneLocation: EPhoneLocations;
	incidentType: EIncidentType;
	description: string;
	participantsInvolved: EParticipants[];
	timeStamp: Date;
	way: string;
}
