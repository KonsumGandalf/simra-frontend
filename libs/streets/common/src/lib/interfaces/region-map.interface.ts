export interface IRegionMap {
	/**
	 * The name of the region.
	 */
	name: string;

	/**
	 * The geometry of the street.
	 */
	way: string;

	/**
	 * The level of the region f.e. county, district, etc.
	 */
	adminLevel: number;
}
