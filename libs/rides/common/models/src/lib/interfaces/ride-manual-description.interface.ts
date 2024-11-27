export interface RideManualDescriptionInterface {
	id: number;
	// rideEntity: RideEntity;
	lat: number;
	// Changed from lon to lng
	lng: number;
	ts: string;
	bike: number;
	childCheckBox: number;
	trailerCheckBox: number;
	pLoc: number;
	incident: number;
	description: string;
}
