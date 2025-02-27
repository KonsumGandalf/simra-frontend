import { CoordinateInterface, MapFilterOptionsInterface } from '@simra/common-models';

/**
 * Interface for getting street information
 */
export interface IGetStreetGrid extends CoordinateInterface, MapFilterOptionsInterface {
	zoom: number;
}


