import { CoordinateInterface } from './coordinate.interface';

export interface MapPositionInterface extends CoordinateInterface {
	/**
	 * Zoom level of the leaflet map
	 */
	zoom: number;

	/**
	 * ID of the street
	 */
	osm_id?: number;
}
