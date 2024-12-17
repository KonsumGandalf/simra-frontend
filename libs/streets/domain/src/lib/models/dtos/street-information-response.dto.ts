import { IsArray, ValidateNested } from 'class-validator';
import { StreetInformationDto } from './street-information.dto';

export class StreetInformationResponseDto {
	@IsArray()
	@ValidateNested({ each: true })
	streetInformation: StreetInformationDto[] = [];
}
