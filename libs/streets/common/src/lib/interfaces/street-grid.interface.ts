export interface IStreetGrid {
	/**
	 * The id of the street.
	 */
	osmId: number;

	/**
	 * The geometry of the street.
	 */
	way: string;

	/**
	 * The type of the street.
	 */
	highway: string;
}
