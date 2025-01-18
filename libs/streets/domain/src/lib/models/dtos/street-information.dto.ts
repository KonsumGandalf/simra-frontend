import { Expose, Type } from 'class-transformer';
import { IsHexColor, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { LineStringDto } from '@simra/streets-common';

export class StreetInformationDto {
	@IsNumber()
	osm_id?: number;

	@ValidateNested()
	@Type(() => LineStringDto)
	way?: LineStringDto;

	@IsOptional()
	@IsString()
	@IsHexColor()
	@Expose({ name: 'dangerous_color' })
	dangerousColor?: string;
}
