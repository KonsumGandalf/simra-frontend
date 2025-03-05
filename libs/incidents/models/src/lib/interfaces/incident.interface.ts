import { ETrafficTimes, EWeekDays } from '@simra/common-models';
import { EBikeType, EIncidentType, EParticipants, EPhoneLocations } from '../enums/public-api';
import { IIncidentMarker } from './incident-marker.interface';

export interface IIncident extends IIncidentMarker{
	bike: EBikeType;
	phoneLocation: EPhoneLocations;
	incidentType: EIncidentType;
	description: string;
	participantsInvolved: EParticipants[];
	timeStamp: Date;
	way: string;

	trafficTime?: ETrafficTimes;
	weekDay?: EWeekDays;
	childCheckBox?: boolean;
	trailerCheckBox?: boolean;
}
