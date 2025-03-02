import { ICycleway } from './cycleway.interface';
import { IParking } from './parking.interface';

/**
 * Contains metadata information about a street
 */
export interface ITags {
	maxSpeed?: number,
	lanes?: number;
	/**
	 * Indicates street is suitable for low visibility conditions
	 */
	lit?: boolean;
	parkingRight?: IParking;
	parkingLeft?: IParking;
	cyclewayRight?: ICycleway;
	cyclewayLeft?: ICycleway;
}
