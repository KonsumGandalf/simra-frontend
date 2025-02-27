import { IResponseStreet, ISafetyMetrics } from '@simra/streets-common';

export class SetStreet {
	static readonly type = '[StreetDetail] Set street';
	constructor(public street: IResponseStreet) {}
}

export class SetSelectedSafetyMetrics {
	static readonly type = '[StreetDetail] Set safety metrics';
	constructor(public safetyMetrics: ISafetyMetrics) {}
}
