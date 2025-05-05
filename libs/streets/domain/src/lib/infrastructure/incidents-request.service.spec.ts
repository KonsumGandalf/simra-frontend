import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EYear } from '@simra/common-models';
import { IncidentDto } from '@simra/incidents-models';
import { firstValueFrom, of } from 'rxjs';
import { IncidentsRequestService } from './incidents-request.service';

describe('IncidentsRequestService', () => {
	let service: IncidentsRequestService;
	let httpClientSpy: { get: jest.Mock };

	beforeEach(() => {
		httpClientSpy = { get: jest.fn().mockReturnValue(of({})) };
		TestBed.configureTestingModule({
			providers: [
				{
					provide: HttpClient,
					useValue: httpClientSpy,
				},
			],
		});
		service = TestBed.inject(IncidentsRequestService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getIncidentForStreet', () => {
		it('should call correct api endpoint', () => {
			service.getIncidentForStreet(1, { year: EYear.Y2020 });
			expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
			expect(httpClientSpy.get).toHaveBeenCalledWith('/api/incidents/street/1', { params: { year: EYear.Y2020 } });
		});

		it('should return the correct incident', async () => {
			const mockIncident = {
				id: 1,
				lat: 52,
			} as IncidentDto;
			httpClientSpy.get.mockReturnValue(of({ incidents: [mockIncident] }));

			const result = await firstValueFrom(
				service.getIncidentForStreet(1, { year: EYear.Y2020 }),
			);
			expect(result).toEqual([mockIncident]);
		});
	});
});
