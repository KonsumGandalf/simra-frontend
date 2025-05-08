import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EWeekDays, IPage } from '@simra/common-models';
import { IStreetsSafetyMetrics, SafetyMetricsDto } from '@simra/streets-common';
import { firstValueFrom, of } from 'rxjs';
import { SafetyMetricsRequestService } from './safety-metrics-request.service';

describe('SafetyMetricsRequestService', () => {
	let service: SafetyMetricsRequestService;
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
		service = TestBed.inject(SafetyMetricsRequestService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getSafetyMetricsForStreet', () => {
		it('should call the correct api endpoint', () => {
			service.getSafetyMetricsForStreet(1, { weekDay: EWeekDays.ALL_WEEK });
			expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
			expect(httpClientSpy.get).toHaveBeenCalledWith('/api/safety-metrics/streets/1', { params: { weekDay: EWeekDays.ALL_WEEK }});
		});

		it('should return the correct street information', async () => {
			const response = {
				dangerousScore: 1,
			} as SafetyMetricsDto;
			httpClientSpy.get.mockReturnValue(of(response));

			const streetInformation = await firstValueFrom(
				service.getSafetyMetricsForStreet(1, {}),
			);
			expect(streetInformation).toMatchObject({
				dangerousScore: 1,
			});
		});
	});

	describe('getStreetList', () => {
		it('should call the api endpoint correctly', () => {
			service.getStreetList({
				id: 1,
				name: '',
			});
			expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
			expect(httpClientSpy.get).toHaveBeenCalledWith('/api/safety-metrics/streets', {
				params: { id: 1 },
			});
		});

		it('should return the correct street information', async () => {
			const response = {
				content: [
					{
						id: 1,
						dangerousScore: 1,
					},
				],
			} as IPage<IStreetsSafetyMetrics>;
			httpClientSpy.get.mockReturnValue(of(response));
			service.getStreetList({
				id: 1,
			});
			const streetInformation = await firstValueFrom(
				service.getStreetList({
					id: 1,
				}),
			);
			expect(streetInformation).toMatchObject({
				content: [
					{
						id: 1,
						dangerousScore: 1,
					},
				],
			});
		});
	});
});
