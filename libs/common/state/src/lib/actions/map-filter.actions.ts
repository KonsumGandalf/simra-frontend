import { MapFilterOptionsInterface } from '@simra/common-models';

export class UpdateFilterOptions {
	static type = '[MapFilter] Set Filter Options';

	constructor(public readonly filterOptions: MapFilterOptionsInterface) {
	}
}
