import { RideManualDescriptionInterface } from '@simra/rides-common-models';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class RideManualDescriptionDto
  implements RideManualDescriptionInterface
{
  @IsNumber()
  id = 0;

  @IsNumber()
  @Type(() => Number)
  lat = 0;

  @IsNumber()
  @Type(() => Number)
  lng = 0;

  @IsString()
  ts = '';

  @IsNumber()
  bike = 0;

  @IsNumber()
  childCheckBox = 0;

  @IsNumber()
  trailerCheckBox = 0;

  @IsNumber()
  pLoc = 0;

  @IsNumber()
  incident = 0;

  @IsString()
  description = '';
}
