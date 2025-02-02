import { RidesGeometriesInterface } from '@simra/rides-common-models';
import { Expose } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class RidesGeometriesResponseDto implements RidesGeometriesInterface{
	@IsArray()
	@IsString({ each: true })
	@Expose({ name: 'incident_locations' })
	incidentLocations: string[];

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
