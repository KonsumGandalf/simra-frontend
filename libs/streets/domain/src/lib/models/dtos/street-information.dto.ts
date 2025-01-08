import { Expose, Type } from 'class-transformer';
import { IsHexColor, IsNumber, IsString, ValidateNested } from 'class-validator';
import { LineStringDto } from '@simra/streets-common';

export class StreetInformationDto {
	@IsNumber()
	id?: number;

	@ValidateNested()
	@Type(() => LineStringDto)
	way?: LineStringDto;

	@IsString()
	@IsHexColor()
	@Expose({ name: 'dangerous_color' })
	dangerousColor?: string;
}
