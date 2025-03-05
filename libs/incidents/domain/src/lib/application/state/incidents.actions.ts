import { IIncidentMarker } from '@simra/incidents-models';

export class SetIncidentMarker {
	static readonly type = '[Incidents] Set incident marker';
	constructor(public incidents: IIncidentMarker[]) {}
}
