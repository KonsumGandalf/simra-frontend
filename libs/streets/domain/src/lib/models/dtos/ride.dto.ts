import { IRide } from '@simra/common-models';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class RideDto implements Pick<IRide, 'rideStart' | 'rideEnd'> {
	@IsString() // Keep this if input is originally a string
	@Transform(({ value }) => new Date(value), { toClassOnly: true }) // Converts string to Date
	public rideStart: Date;

	@IsString() // Keep this if input is originally a string
	@Transform(({ value }) => new Date(value), { toClassOnly: true }) // Converts string to Date
	public rideEnd: Date;
}
