import { IIncidentMarker } from '@simra/incidents-models';

export interface RidesGeometriesInterface {
	incidentLocations: IIncidentMarker[];
	assignedWays: string[];
	incidentWays: string[];
	visitedWay: string;
}
