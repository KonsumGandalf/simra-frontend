import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { LineStringDto } from '@simra/streets-common';

export class StreetInformationDto {
	@IsNumber()
	id?: number;

	@ValidateNested()
	@Type(() => LineStringDto)
	way?: LineStringDto;
}
