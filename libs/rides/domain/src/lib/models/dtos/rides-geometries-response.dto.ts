import { RidesGeometriesInterface } from '@simra/rides-common-models';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { IncidentMarkerDTO } from '@simra/incidents-domain';

export class RidesGeometriesResponseDto implements RidesGeometriesInterface{
	@IsArray()
	@Expose({ name: 'incident_locations' })
	@ValidateNested({ each: true }) // ✅ Validates each item against IncidentMarkerDTO
	@Type(() => IncidentMarkerDTO)
	@Transform(({ value }) => {
		// ✅ Ensure it's an array, parse JSON strings into objects
		if (!Array.isArray(value)) return [];

		return value.map((item) => {
			return (typeof item === 'string') ? JSON.parse(item) : item; // Return object as is
		}).filter(Boolean); // Remove null values from invalid JSON
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
