import { ECyclewayType } from '@simra/common-models';

/**
 * Interface for the appearance of the cycleway
 */
export interface ICycleway {
	width?: number;
	/**
	 * Determines the type f.e. if it is seperated or not.
	 * @see https://wiki.openstreetmap.org/wiki/Key:cycleway:lane
	 */
	type?: ECyclewayType;
}
