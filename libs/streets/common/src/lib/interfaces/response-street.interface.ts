import { ISafetyMetricsStreet } from '@simra/common-models';
import { IIncident } from '@simra/incidents-models';
import { ITags } from './tags.interface';
import { IWay } from './way-line.interface';

export interface IResponseStreet {
	id: number;
	safetyMetricPlanetOsmLines: ISafetyMetricsStreet[];
	rideIncident: IIncident[];
	way: IWay;
	highway: string;
	name: string;
	tags: ITags;
}
