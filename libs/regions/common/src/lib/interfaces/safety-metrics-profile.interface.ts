export interface ISafetyMetricsProfile {
	totalIncidents: number;
	totalScaryIncidents: number;
	totalRides: number;
	dangerousScore: number;
	groupName: string;
	lastModified: Date;
}
