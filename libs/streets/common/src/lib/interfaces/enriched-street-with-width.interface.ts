import { IEnrichedStreet } from './enriched-street.interface';

/**
 * The enriched street interface which can color the map
 */
export interface IEnrichedWithWidth extends IEnrichedStreet {
	width: number;
}
