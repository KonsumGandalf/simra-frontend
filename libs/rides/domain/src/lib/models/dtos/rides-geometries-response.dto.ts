import { RidesGeometriesInterface } from '@simra/rides-common-models';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { IncidentMarkerDTO } from '@simra/incidents-domain';

export class RidesGeometriesResponseDto implements RidesGeometriesInterface{
	@IsArray()
	@Expose({ name: 'incident_locations' })
	@ValidateNested({ each: true })
	@Type(() => IncidentMarkerDTO)
	@Transform(({ value }) => {
		if (!Array.isArray(value)) return [];

		return value.map((item) => {
			return (typeof item === 'string') ? JSON.parse(item) : item;
		}).filter(Boolean);
	})
	incidentLocations: IncidentMarkerDTO[] = [];

	@IsArray()
	@IsString({ each: true })
	@Expose({ name: 'assigned_ways' })
	assignedWays: string[];

	@IsArray()
	@IsString({ each: true })
	@Expose({ name: 'incident_ways' })
	incidentWays: string[];

	@IsArray()
	@IsString()
	@Expose({ name: 'visited_way' })
	visitedWay: string;
}
