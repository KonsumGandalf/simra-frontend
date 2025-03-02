import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, model, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import {
	ChartDirective,
	EnumSelectButtonComponent,
	EnumSelectComponent,
	TRAFFIC_TIMES_TO_TRANSLATION,
	WEEK_DAYS_TO_TRANSLATION,
} from '@simra/common-components';
import { ETrafficTimes, EWeekDays } from '@simra/common-models';
import { SetSelectedIncidents, SetSelectedSafetyMetrics, StreetDetailState } from '@simra/streets-domain';
import { find, first, last } from 'lodash';
import { Card } from 'primeng/card';
import { UIChart } from 'primeng/chart';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { firstValueFrom } from 'rxjs';
import { SafetyMetricsService } from '../../../services/safety-metrics.service';
import { StreetAnalyticsService } from '../../../services/street-analytics.service';
import { SafetyMetricsDigitPanelComponent } from '../../safety-metrics-digit-panel/component/safety-metrics-digit-panel.component';
import { CARD_MODE_TO_TRANSLATION_MAP } from '../models/card-mode-to-translation.map';
import { ECardMode } from '../models/card-mode.enum';


@Component({
	selector: 'm-safety-metrics-card',
	imports: [
		CommonModule,
		Card,
		SafetyMetricsDigitPanelComponent,
		UIChart,
		FormsModule,
		DatePicker,
		FloatLabel,
		EnumSelectButtonComponent,
		EnumSelectComponent,
		ChartDirective,
		TranslatePipe,
	],
	templateUrl: './safety-metrics-card.component.html',
	styleUrl: './safety-metrics-card.component.scss',
	host: {
		class: 'm-safety-metrics-panel',
	},
	encapsulation: ViewEncapsulation.None,
})
export class SafetyMetricsCardComponent {
	private readonly _safetyMetricsService = inject(SafetyMetricsService);
	private readonly _store = inject(Store);
	private readonly _analyticsService = inject(StreetAnalyticsService);
	protected readonly CARD_MODE_TO_TRANSLATION_MAP = CARD_MODE_TO_TRANSLATION_MAP;
	protected readonly _mode$ = model<ECardMode>(ECardMode.PRECOMPUTED);
	protected readonly _datetime$ = model<Date[]>([new Date('2019-01-01T00:00'), new Date()]);
	protected readonly _parsedDatetime$ = computed(() => {
		const datetime = this._datetime$();
		if (!datetime || datetime.length !== 2) {
			return;
		}

		return datetime.map((date) => new Date(date));
	});

	protected readonly _selectedWeekDays = model<EWeekDays[]>([EWeekDays.WEEK, EWeekDays.WEEKEND]);

	protected readonly _selectedTrafficTime = model<ETrafficTimes>(ETrafficTimes.ALL_DAY);

	protected readonly _street$ = this._store.selectSignal(StreetDetailState.getStreet);
	protected readonly _selectedSafetyMetrics$ = this._store.selectSignal(
		StreetDetailState.getSelectedSafetyMetrics,
	);
	protected readonly _pieMetricsIncidentTypesOptions =
		this._safetyMetricsService.getPieMetricsIncidentTypesOptions();
	protected readonly _pieMetricsIncidentTypesData$ =
		this._safetyMetricsService.pieMetricsIncidentTypesData$;
	protected readonly _barMetricsRideIncidentDistributionOptions =
		this._safetyMetricsService.getBarMetricsRideIncidentDistributionOptions();
	protected readonly _barMetricsRideIncidentDistributionData$ =
		this._safetyMetricsService.barMetricsRideIncidentDistributionData$;
	protected readonly ETrafficTimes = ETrafficTimes;
	protected readonly EWeekDays = EWeekDays;
	protected readonly WEEK_DAYS_TO_TRANSLATION = WEEK_DAYS_TO_TRANSLATION;
	protected readonly TRAFFIC_TIMES_TO_TRANSLATION = TRAFFIC_TIMES_TO_TRANSLATION;
	protected readonly ESCardMode = ECardMode;

	protected startTime = model<Date>(new Date('1970-01-01T00:00:00'));
	protected endTime = model<Date>(new Date('1970-01-01T23:59'));

	constructor() {
		effect(async () => {
			const mode = this._mode$();
			const street = this._street$();

			if (street && mode === ECardMode.PRECOMPUTED) {
				const selectedWeekDays = this._selectedWeekDays();
				const selectedWeekDay =
					selectedWeekDays.length === 1 ? first(selectedWeekDays) : EWeekDays.ALL_WEEK;

				const selectedTrafficTimes = this._selectedTrafficTime();

				const selectedMetrics = find(street.safetyMetrics, (metrics) => {
					return (
						metrics.weekDay === selectedWeekDay &&
						metrics.trafficTime === selectedTrafficTimes
					);
				});

				const incidents = street.rideIncident?.filter((incident) => {
					return (
						(incident.trafficTime === selectedTrafficTimes || selectedTrafficTimes === ETrafficTimes.ALL_DAY)
						&& (incident.weekDay === selectedWeekDay || selectedWeekDay === EWeekDays.ALL_WEEK)
					);
				});

				this._store.dispatch(new SetSelectedIncidents(incidents));
				this._store.dispatch(new SetSelectedSafetyMetrics(selectedMetrics));
			}

			if (mode === ECardMode.REALTIME) {
				const datetime = this._parsedDatetime$();
				const startTime = this.startTime();
				const endTime = this.endTime();

				if (!datetime || !startTime || !endTime) {
					return;
				}
				await firstValueFrom(
					this._analyticsService.calculateSafetyMetrics(
						first(datetime),
						last(datetime),
						startTime,
						endTime,
					),
				);
			}
		});
	}
}
