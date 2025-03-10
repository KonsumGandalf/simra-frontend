import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { EDangerousColors, ISafetyMetrics } from '@simra/common-models';
import { EIncidentType } from '@simra/incidents-models';
import { SetSelectedIncidents, SetSelectedSafetyMetrics, StreetAnalyticsFacadeFacade, StreetDetailState } from '@simra/streets-domain';
import { orderBy, partition } from 'lodash';
import { Moment } from 'moment';
import { map, Observable, tap } from 'rxjs';
import moment from 'moment';
import { DANGEROUS_SCORE_TO_COLOR_MAP } from '../models/maps/dangerous-color-to-color.map';

@Injectable({
	providedIn: 'root',
})
export class StreetAnalyticsService {
	private readonly _store = inject(Store);
	private readonly _streetAnalyticsFacade = inject(StreetAnalyticsFacadeFacade);

	private readonly _SCARINESS_FACTOR = 4.4;
	private readonly _street = this._store.selectSignal(StreetDetailState.getStreet);

	public calculateSafetyMetrics(startDay: Date, endDay: Date, startTime: Date, endTime: Date): Observable<ISafetyMetrics> {
		const street = this._street();
		if (!street) {
			return;
		}

		const [startDayMoment, endDayMoment, startTimeMoment, endTimeMoment] = [moment(startDay).startOf('day'), moment(endDay).endOf('day'), this.momentTime(moment(startTime)), this.momentTime(moment(endTime))];
		const unfilteredIncidents = street.rideIncident;

		const incidents = unfilteredIncidents.filter((incident) => this.isInRange(incident.timeStamp, startDayMoment, endDayMoment, startTimeMoment, endTimeMoment));
		const [scaryIncidents, nonScaryIncidents] = partition(incidents, 'scary');

		return this._streetAnalyticsFacade.getStreetRideEntities(street.id, { rideStart: startDay, rideEnd: endDay }).pipe(
			map((unfilteredRides) => {
				const rides = unfilteredRides.filter((ride) => {
					return this.isInRange(ride.rideStart, startDayMoment, endDayMoment, startTimeMoment, endTimeMoment)
						|| this.isInRange(ride.rideEnd, startDayMoment, endDayMoment, startTimeMoment, endTimeMoment)
				});

				const safetyMetrics = {
					osmId: street.id,
					numberOfRides: rides.length,
					numberOfIncidents: incidents.length,
					numberOfScaryIncidents: scaryIncidents.length,

					dangerousScore: 0,
					numberOfClosePasses: 0,
					numberOfPullInOuts: 0,
					numberOfNearLeftRightHooks: 0,
					numberOfHeadOnApproaches: 0,
					numberOfTailgating: 0,
					numberOfNearDoorings: 0,
					numberOfObstacleDodges: 0,
				} as ISafetyMetrics;

				for (const incident of incidents) {
					switch (incident.incidentType) {
						case EIncidentType.CLOSE_PASS: safetyMetrics.numberOfClosePasses++; break;
						case EIncidentType.PULLING_IN_OUT: safetyMetrics.numberOfPullInOuts++; break;
						case EIncidentType.NEAR_LEFT_RIGHT_HOOK: safetyMetrics.numberOfNearLeftRightHooks++; break;
						case EIncidentType.HEAD_ON_APPROACH: safetyMetrics.numberOfHeadOnApproaches++; break;
						case EIncidentType.TAILGATING: safetyMetrics.numberOfTailgating++; break;
						case EIncidentType.NEAR_DOORING: safetyMetrics.numberOfNearDoorings++; break;
						case EIncidentType.DODGING_OBSTACLE: safetyMetrics.numberOfObstacleDodges++; break;
						default: break;
					}
				}

				if (rides.length) {
					safetyMetrics.dangerousScore = ((this._SCARINESS_FACTOR * scaryIncidents.length + nonScaryIncidents.length)
						/ rides.length);
					safetyMetrics.dangerousColor = this.getColorForScore(safetyMetrics.dangerousScore);
				}
				return safetyMetrics;
			}),
			tap((safetyMetrics) => {
				this._store.dispatch(new SetSelectedIncidents(incidents));
				this._store.dispatch(new SetSelectedSafetyMetrics(safetyMetrics));
			})
		);
	}

	private isInRange(timestamp: Date, startDayMoment: Moment, endDayMoment: Moment, startTimeMoment: Moment, endTimeMoment: Moment): boolean {
		const timestampMoment = moment(timestamp);

		const timestampDate = timestampMoment.clone().startOf('day');
		const timestampTime = this.momentTime(timestampMoment.clone());

		const isInDateRange = timestampDate.isBetween(startDayMoment, endDayMoment, null, '[]');
		const isInTimeRange = timestampTime.isBetween(startTimeMoment, endTimeMoment, null, '[]');

		return isInDateRange && isInTimeRange;
	}

	private momentTime(time: Moment): Moment {
		return moment({ hour: time.hour(), minute: time.minute(), second: time.second() });
	}

	private getColorForScore(score: number): EDangerousColors {
		const orderedRecordArray = orderBy(Object.entries(DANGEROUS_SCORE_TO_COLOR_MAP), ['0'], ['desc'])
		for (const [threshold, color] of orderedRecordArray) {
			if (score >= +threshold) {
				return color;
			}
		}
	}

}
