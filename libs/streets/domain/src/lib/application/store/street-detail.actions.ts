import { ISafetyMetrics } from '@simra/common-models';
import { IIncident } from '@simra/incidents-models';
import { IResponseStreet } from '@simra/streets-common';

export class SetStreet {
	static readonly type = '[StreetDetail] Set street';
	constructor(public street: IResponseStreet) {}
}

export class SetSelectedSafetyMetrics {
	static readonly type = '[StreetDetail] Set selected safety metrics';
	constructor(public safetyMetrics: ISafetyMetrics) {}
}

export class SetSelectedIncidents {
	static readonly type = '[StreetDetail] Set selected incidents';
	constructor(public incidents: IIncident[]) {}
}
