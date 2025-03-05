import { IIncidentMarker } from '@simra/incidents-models';
import { IsBoolean, IsNumber } from 'class-validator';

export class IncidentMarkerDTO implements IIncidentMarker{
	@IsNumber()
	id: number;

	@IsNumber()
	lat: number;

	@IsNumber()
	lng: number;

	@IsBoolean()
	scary: boolean;
}
