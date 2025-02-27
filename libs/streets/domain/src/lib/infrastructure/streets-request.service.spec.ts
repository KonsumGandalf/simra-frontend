import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StreetsRequestService } from './streets-request.service';

describe('StreetsRequestService', () => {
	let service: StreetsRequestService;
	let httpClientSpy: { get: jest.Mock };

	beforeEach(() => {
		httpClientSpy = { get: jest.fn().mockReturnValue(of({})) }
		TestBed.configureTestingModule({
			providers: [{
				provide: HttpClient,
				useValue: httpClientSpy
			} ],
		});
		service = TestBed.inject(StreetsRequestService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getStreetInformation', () => {
		it('should call the correct api endpoint', () => {
			service.getStreetGrid({ zoom: 14, lat: 10, lng: 12, trafficTime: undefined, weekDay: undefined });
			expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
			expect(httpClientSpy.get).toHaveBeenCalledWith('/api/streets/grid', { params: { zoom: 14, lat: 10, lng: 12 } });
		});

		it('should return the correct street information', async () => {
			const response = {
				osm_id: 1,
				way: {
					type: 'LineString',
					coordinates: [
						[10, 12],
						[11, 13],
					],
				},
				dangerous_color: '#FF0000',
			};
			httpClientSpy.get.mockReturnValue(of([response]));


			const streetInformation = await service.getStreetGrid({ zoom: 14, lat: 10, lng: 12, trafficTime: undefined, weekDay: undefined }).toPromise();
			expect(streetInformation).toMatchObject([{
				osm_id: 1,
				way: {
					type: 'LineString',
					coordinates: [
						[10, 12],
						[11, 13],
					],
				}
			}]);
		});
	});
});
