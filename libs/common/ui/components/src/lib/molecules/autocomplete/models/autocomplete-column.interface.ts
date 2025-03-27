import { Column } from '@simra/common-models';
import { Observable } from 'rxjs';

export interface AutocompleteColumn extends Column {
	fetchFunction: (search: string) => Observable<string[]>;
}
