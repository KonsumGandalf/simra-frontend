import { IRide } from '@simra/common-models';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class RideDto implements Pick<IRide, 'rideStart' | 'rideEnd'> {
	@IsString()
	@Transform(({ value }) => new Date(value), { toClassOnly: true })
	public rideStart: Date;

	@IsString()
	@Transform(({ value }) => new Date(value), { toClassOnly: true })
	public rideEnd: Date;
}
