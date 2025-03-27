import { Column } from '@simra/common-models';
import { AutocompleteColumn } from './autocomplete-column.interface';

export function isAutocompleteColumn(column: Column): AutocompleteColumn | undefined {
	if ((column as AutocompleteColumn).fetchFunction !== undefined) {
		return column as AutocompleteColumn;
	}
	return undefined;
}
