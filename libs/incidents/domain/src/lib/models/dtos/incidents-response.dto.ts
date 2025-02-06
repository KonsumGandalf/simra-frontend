import { IsString } from 'class-validator';

/**
 * The response DTO for the incidents endpoint
 */
export class IncidentsResponseDto {
	@IsString()
	incidents: string;
}
