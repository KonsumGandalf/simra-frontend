import { EParticipants } from '@simra/incidents-models';
import { IconTooltipInterface } from '../../icon/models/icon-tooltip.interface';

export const participantToIcon: Record<EParticipants, IconTooltipInterface> = {
	[EParticipants.BUS_COACH]: { name: 'bus', tooltip: 'INCIDENTS.UI.PARTICIPANTS.BUS_COACH' },
	[EParticipants.CYCLIST]: { name: 'bicycle', tooltip: 'INCIDENTS.UI.PARTICIPANTS.CYCLIST' },
	[EParticipants.PEDESTRIAN]: { name: 'person-simple-walk', tooltip: 'INCIDENTS.UI.PARTICIPANTS.PEDESTRIAN' },
	[EParticipants.DELIVERY_VAN]: { name: 'truck', tooltip: 'INCIDENTS.UI.PARTICIPANTS.DELIVERY_VAN' },
	[EParticipants.LORRY_TRUCK]: { name: 'truck', tooltip: 'INCIDENTS.UI.PARTICIPANTS.LORRY_TRUCK' },
	[EParticipants.MOTORCYCLIST]: { name: 'motorcycle', tooltip: 'INCIDENTS.UI.PARTICIPANTS.MOTORCYCLIST' },
	[EParticipants.CAR]: { name: 'car', tooltip: 'INCIDENTS.UI.PARTICIPANTS.CAR' },
	[EParticipants.TAXI_CAB]: { name: 'taxi', tooltip: 'INCIDENTS.UI.PARTICIPANTS.TAXI_CAB' },
	[EParticipants.OTHER]: { name: 'question', tooltip: 'INCIDENTS.UI.PARTICIPANTS.OTHER' },
	[EParticipants.ELECTRIC_SCOOTER]: { name: 'scooter', tooltip: 'INCIDENTS.UI.PARTICIPANTS.ELECTRIC_SCOOTER' },
};
