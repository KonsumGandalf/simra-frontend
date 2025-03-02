import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { EIncidentType, IIncident } from '@simra/incidents-models';
import { IResponseStreet } from '@simra/streets-common';
import { SetStreet, StreetAnalyticsFacadeFacade, StreetDetailState } from '@simra/streets-domain';
import { firstValueFrom, of } from 'rxjs';
import { StreetAnalyticsService } from './street-analytics.service';
import SpyInstance = jest.SpyInstance;
import moment = require('moment');

describe('StreetAnalyticsService', () => {
	let service: StreetAnalyticsService;
	let store: Store;
	let mockFacade;

	beforeEach(() => {
		mockFacade = {
			getStreetRideEntities: jest.fn().mockReturnValue(of([])),
		};

		TestBed.configureTestingModule({
			providers: [
				provideStore([StreetDetailState]),
				{
					provide: StreetAnalyticsFacadeFacade,
					useValue: mockFacade,
				},
			],
		});
		service = TestBed.inject(StreetAnalyticsService);
		store = TestBed.inject(Store);
	});

	it('service should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('calculateSafetyMetrics', () => {
		let mockId: number;
		let mockIncidents: IIncident[];
		let functionSpy: SpyInstance;
		let startDate: Date;
		let endDate: Date;
		let startTime: Date;
		let endTime: Date;

		beforeEach(() => {
			functionSpy = jest.spyOn(mockFacade, 'getStreetRideEntities');

			mockIncidents = [
				{ timeStamp: new Date('2021-02-26T14:30:00Z') },
				{ timeStamp: new Date('2024-02-26T12:30:00Z') },
				{ timeStamp: new Date('2024-02-26T14:30:00Z') },
				{ timeStamp: new Date('2024-02-26T14:59:00Z') },
				{ timeStamp: new Date('2024-02-26T20:30:00Z') },
			] as IIncident[];

			mockId = 1;

			store.dispatch(
				new SetStreet({
					rideIncident: mockIncidents,
					id: mockId,
				} as IResponseStreet),
			);

			startDate = new Date('2024-02-26T00:00:00Z');
			endDate = new Date('2024-02-26T00:00:00Z');
			startTime = new Date('1970-01-01T14:30:00Z');
			endTime = new Date('1970-01-01T14:59:00Z');
		});

		it('should use just incidents within the given time range', async () => {
			const result = await firstValueFrom(service.calculateSafetyMetrics(startDate, endDate, startTime, endTime));

			expect(result.numberOfIncidents).toBe(2);
			expect(result.numberOfRides).toBe(0);
		});

		it('should use the correct params for getting the rides', async () => {
			await firstValueFrom(service.calculateSafetyMetrics(startDate, endDate, startTime, endTime));

			expect(functionSpy).toHaveBeenCalledTimes(1);
			expect(functionSpy).toHaveBeenCalledWith(mockId, {
				rideStart: startDate,
				rideEnd: endDate,
			});
		});

		it('should calculate the types of incidents correctly', async () => {
			const mockDate1 = new Date('2024-02-26T14:30:00Z');
			const mockDate2 = new Date('2024-02-26T14:59:00Z');
			const mockIncidents = [
				{
					timeStamp: mockDate1,
					incidentType: EIncidentType.CLOSE_PASS,
					scary: true
				},
				{
					timeStamp: mockDate2,
					incidentType: EIncidentType.HEAD_ON_APPROACH
				}
			] as IIncident[];
			const mockRides = [
				{ rideStart: mockDate1, rideEnd: mockDate2 },
				{ rideStart: moment(mockDate1).subtract(1, 'minute').toDate(), rideEnd: moment(mockDate2).subtract(2, 'second').toDate() },
			]
			store.dispatch(
				new SetStreet({
					rideIncident: mockIncidents,
					id: mockId,
				} as IResponseStreet),
			);
			functionSpy.mockReturnValue(of(mockRides));

			const result = await firstValueFrom(service.calculateSafetyMetrics(startDate, endDate, startTime, endTime));
			expect(result).toMatchObject({
				numberOfIncidents: 2,
				numberOfScaryIncidents: 1,
				numberOfRides: 2,

				dangerousScore: (4.4 + 1) / 2,
				numberOfClosePasses: 1,
				numberOfHeadOnApproaches: 1,

				numberOfPullInOuts: 0,
				numberOfNearLeftRightHooks: 0,
				numberOfTailgating: 0,
				numberOfNearDoorings: 0,
				numberOfObstacleDodges: 0,
			})
		});
	});
});
