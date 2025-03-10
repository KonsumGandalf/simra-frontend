import { Injectable, Signal, computed, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { safetyMetricsDisplayArray } from '@simra/common-components';
import { StreetDetailState } from '@simra/streets-domain';
import { ChartData } from 'chart.js';
import { drop, values } from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class SafetyMetricsService {
	private readonly _translationService = inject(TranslateService);
	private readonly _store = inject(Store);
	private readonly _safetyMetrics$ = this._store.selectSignal(StreetDetailState.getSelectedSafetyMetrics);

	/**
	 * Calculates the data for the pie chart displaying the incident types
	 */
	public readonly pieMetricsIncidentTypesData$: Signal<ChartData | undefined> = computed(() => {
		const metrics = this._safetyMetrics$();
		if (!metrics) {
			return undefined;
		}

		const displayMetrics = drop(safetyMetricsDisplayArray(metrics), 5).filter(res => res.data !== 0);
		if (displayMetrics.length < 1) {
			return undefined;
		}

		const labels = displayMetrics.map(({ label }) => label);
		const translatedLabels = this._translationService.instant(labels);

		return {
			datasets: [{ data: displayMetrics.map((value) => value.data) }],
			labels: values(translatedLabels),
		};
	});

	/**
	 * Calculates the data for the bar chart displaying the incident distribution
	 */
	public readonly barMetricsRideIncidentDistributionData$: Signal<ChartData | undefined> = computed(() => {
		const metrics = this._safetyMetrics$();
		if (!metrics) {
			return;
		}
		const displayMetrics = safetyMetricsDisplayArray(metrics).slice(2, 5);

		if (!displayMetrics || displayMetrics.length < 1) {
			return undefined;
		}

		const labels = displayMetrics.map(({ label }) => label);

		const translatedLabels = this._translationService.instant(labels);
		return {
			datasets: [
				{
					data: displayMetrics.map((value) => value.data),
					backgroundColor: ['#36a2eb', '#ffcd56', '#ff6483'],
				},
			],
			labels: values(translatedLabels),
		};
	});
}
