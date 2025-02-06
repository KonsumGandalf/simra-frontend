import { IncidentMarkerInterface } from '@simra/incidents-models';
import { IsBoolean, IsNumber } from 'class-validator';

export class IncidentMarkerDTO implements IncidentMarkerInterface{
	@IsNumber()
	id: number;

	@IsNumber()
	lat: number;

	@IsNumber()
	lng: number;

	@IsBoolean()
	scary: boolean;
}
