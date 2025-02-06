import { IncidentMarkerInterface } from '@simra/incidents-models';

export interface RidesGeometriesInterface {
	incidentLocations: IncidentMarkerInterface[];
	assignedWays: string[];
	incidentWays: string[];
	visitedWay: string;
}
