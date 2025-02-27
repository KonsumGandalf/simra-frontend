import { IncidentInterface } from '@simra/incidents-models';
import { ISafetyMetrics } from '../interfaces/safety-metrics.interface';
import { ITags } from './tags.interface';

export interface IResponseStreet {
	id: number;
	safetyMetrics: ISafetyMetrics[];
	rideIncident: IncidentInterface[];
	way: any;
	highway: string;
	name: string;
	tags: ITags
}
