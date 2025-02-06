import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { IncidentMarkerDTO, IncidentRequestService, IncidentsResponseDto } from '../public-api';
import { firstValueFrom, of } from 'rxjs';

describe('IncidentRequestService', () => {
	let service: IncidentRequestService;
	let httpClientSpy: { get: jest.Mock };

	beforeEach(() => {
		httpClientSpy = { get: jest.fn().mockReturnValue(of({})) }
		TestBed.configureTestingModule({
			providers: [{
				provide: HttpClient,
				useValue: httpClientSpy
			} ],
		});
		service = TestBed.inject(IncidentRequestService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getIncidents', () => {
		it('should call getIncidents', () => {
			service.getIncidents();
			expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
			expect(httpClientSpy.get).toHaveBeenCalledWith('/api/incidents/marker')
		});

		it('should return an array of incidents', async () => {
			const response = { incidents: "[{\"id\" : 1, \"lng\" : \"12\", \"lat\" : 52, \"scary\" : false}, {\"id\" : 2, \"lng\" : 13, \"lat\" : 53, \"scary\" : true }]" }
			httpClientSpy.get.mockReturnValue(of(response) as unknown as IncidentsResponseDto);
			const incidents = await firstValueFrom(service.getIncidents());
			expect(incidents).toEqual([
				{ id: 1, lng: 12, lat: 52, scary: false } as IncidentMarkerDTO,
				{ id: 2, lng: 13, lat: 53, scary: true } as IncidentMarkerDTO,
			]);
		});
	});

	describe('getIncidentDetails', () => {
		it('should call getIncidentDetails', ()=> {
			service.getIncidentDetails(1);
			expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
			expect(httpClientSpy.get).toHaveBeenCalledWith('/api/incidents/1')
		})
	})
});


