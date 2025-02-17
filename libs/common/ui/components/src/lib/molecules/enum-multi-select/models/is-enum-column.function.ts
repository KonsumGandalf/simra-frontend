import { Column } from '@simra/common-models';
import { EnumColumn } from './enum-column.interface';

export function isEnumColumn(column: Column): EnumColumn | undefined {
	if ((column as EnumColumn).enum) {
		return column as EnumColumn;
	}
	return undefined;
}
