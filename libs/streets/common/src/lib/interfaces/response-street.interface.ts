import { ISafetyMetrics } from '@simra/common-models';
import { IIncident } from '@simra/incidents-models';
import { ITags } from './tags.interface';

export interface IResponseStreet {
	id: number;
	safetyMetrics: ISafetyMetrics[];
	rideIncident: IIncident[];
	way: any;
	highway: string;
	name: string;
	tags: ITags;
}
