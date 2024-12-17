import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LineString, Position } from 'geojson';

export class LineStringDto implements LineString {
  @IsString()
  type!: 'LineString';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  coordinates: Position[] = [];
}
