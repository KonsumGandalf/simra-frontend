import { EIncidentType } from '@simra/incidents-models';
import { IconTooltipInterface } from '../../icon/models/icon-tooltip.interface';

/*
export const incidentTypeToIcon: Record<EIncidentType, IconTooltipInterface> = {
	[EIncidentType.DUMMY_INCIDENT]: { name: 'question', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.DUMMY_INCIDENT' },
	[EIncidentType.NOTHING]: { name: 'question', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.NOTHING' },
	[EIncidentType.CLOSE_PASS]: { name: 'wind', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.CLOSE_PASS' },
	[EIncidentType.PULLING_IN_OUT]: { name: 'git-pull-request', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.PULLING_IN_OUT' },
	[EIncidentType.NEAR_LEFT_RIGHT_HOOK]: { name: 'arrow-elbow-up-right', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.NEAR_LEFT_RIGHT_HOOK' },
	[EIncidentType.HEAD_ON_APPROACH]: { name: 'arrows-in-line-vertical', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.HEAD_ON_APPROACH' },
	[EIncidentType.TAILGATING]: { name: 'ruler', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.TAILGATING' },
	[EIncidentType.NEAR_DOORING]: { name: 'door-open', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.NEAR_DOORING' },
	[EIncidentType.DODGING_OBSTACLE]: { name: 'flow-arrow', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.DODGING_OBSTACLE' },
	[EIncidentType.OTHER]: { name: 'dots-three-circle', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.OTHER' },
};*/
export const INCIDENT_TYPE_TO_ICON: Record<EIncidentType, IconTooltipInterface> = {
	[EIncidentType.DUMMY_INCIDENT]: { svgPath: 'assets/icons/incidents/ui/other.svg', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.DUMMY_INCIDENT' },
	[EIncidentType.NOTHING]: { svgPath: 'assets/icons/incidents/ui/other.svg', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.NOTHING' },
	[EIncidentType.CLOSE_PASS]: { svgPath: 'assets/icons/incidents/ui/close-pass.svg', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.CLOSE_PASS' },
	[EIncidentType.PULLING_IN_OUT]: { svgPath: 'assets/icons/incidents/ui/pulling-in-out.svg', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.PULLING_IN_OUT' },
	[EIncidentType.NEAR_LEFT_RIGHT_HOOK]: { svgPath: 'assets/icons/incidents/ui/near-left-right-hook.svg', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.NEAR_LEFT_RIGHT_HOOK' },
	[EIncidentType.HEAD_ON_APPROACH]: { svgPath: 'assets/icons/incidents/ui/head-on-approach.svg', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.HEAD_ON_APPROACH' },
	[EIncidentType.TAILGATING]: { svgPath: 'assets/icons/incidents/ui/tailgating.svg', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.TAILGATING' },
	[EIncidentType.NEAR_DOORING]: { svgPath: 'assets/icons/incidents/ui/near-dooring.svg', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.NEAR_DOORING' },
	[EIncidentType.DODGING_OBSTACLE]: { svgPath: 'assets/icons/incidents/ui/dodging-obstacle.svg', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.DODGING_OBSTACLE' },
	[EIncidentType.OTHER]: { svgPath: 'assets/icons/incidents/ui/other.svg', tooltip: 'INCIDENTS.UI.INCIDENT_TYPES.OTHER' },
};
