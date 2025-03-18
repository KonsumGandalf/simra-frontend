import { EGroupType } from '../enum/group-type.enum';
import { ISafetyMetricsProfile } from './safety-metrics-profile.interface';

export interface IProfileGroupAssociation {
	name: string;
	groupType: EGroupType;
	groupValue: ISafetyMetricsProfile[];
}
