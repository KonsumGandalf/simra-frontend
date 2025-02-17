/**
 * Basic interface for paginated data of spring data rest
 */
export interface IPage<T> {
	content: T[];
	pageable: Pageable;
	totalPages: number;
	totalElements: number;
	number: number;
	size: number;
	numberOfElements: number;
	sort: Sort;
	first: boolean;
	last: boolean;
	empty: boolean;
}

interface Pageable {
	sort: Sort;
	offset: number;
	pageNumber: number;
	pageSize: number;
	paged: boolean;
	unpaged: boolean;
}

interface Sort {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
}
