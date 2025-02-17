import { Column } from '@simra/common-models';

export interface NumberColumn extends Column {
	step: number;
	min: number;
}
