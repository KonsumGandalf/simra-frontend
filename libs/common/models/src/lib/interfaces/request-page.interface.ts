export interface IRequestPage {
	/**
	 * Page number for pagination (from Pageable)
	 * @example page=0
	 */
	page?: number;
	/**
	 * Size of the page for pagination (from Pageable)
	 * @example size=20
	 */
	size?: number;
	/**
	 * Sorting for pagination (from Pageable)
	 * @example sort=createdAt,desc
	 */
	sort?: string;
}
