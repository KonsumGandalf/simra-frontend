import { Column } from '@simra/common-models';
import { NumberColumn } from './number-column.interface';

export function isNumberColumn(column: Column): NumberColumn | undefined {
	if ((column as NumberColumn).min !== undefined) {
		return column as NumberColumn;
	}
	return undefined;
}
