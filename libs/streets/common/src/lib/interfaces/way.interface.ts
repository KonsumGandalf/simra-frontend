import { LatLngExpression } from 'leaflet';

export interface IWay {
	coordinates: LatLngExpression[];
	type: string;
}
