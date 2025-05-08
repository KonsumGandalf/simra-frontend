import { IStreetGrid } from './street-grid.interface';

/**
 * The enriched street interface which can color the map
 */
export interface IEnrichedStreet extends IStreetGrid {
	dangerousColor?: string;
}
