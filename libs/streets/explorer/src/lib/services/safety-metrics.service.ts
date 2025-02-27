import { Injectable, Signal, computed, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { StreetDetailState } from '@simra/streets-domain';
import { ChartData, ChartOptions } from 'chart.js';
import { Tick } from 'chart.js/dist/types';
import { drop, values } from 'lodash';
import { safetyMetricsDisplayArray } from '../models/const';

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
	 * Options for the pie chart displaying the incident types
	 */
	public getPieMetricsIncidentTypesOptions(): ChartOptions {
		return {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				title: {
					display: true,
					text: this._translationService.instant(
						'STREETS.EXPLORER.COMPONENTS.SAFETY_METRICS_PANEL.CHARTS.INCIDENT_TYPES.TITLE',
					),
					padding: {
						top: 5,
					},
				},
			},
		};
	}

	/**
	 * Options for the bar chart displaying the incident distribution
	 */
	public getBarMetricsRideIncidentDistributionOptions(): ChartOptions {
		return {
			responsive: true,
			aspectRatio: 0.6,
			plugins: {
				title: {
					display: true,
					text: this._translationService.instant(
						'STREETS.EXPLORER.COMPONENTS.SAFETY_METRICS_PANEL.CHARTS.RIDE_INCIDENT_DISTRIBUTION.TITLE',
					),
					padding: {
						top: 5,
						bottom: 20,
					},
				},
				legend: {
					display: false,
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						count: 11,
					},
				},
				right: {
					beginAtZero: true,
					position: 'right',
					ticks: {
						count: 11,
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						callback: (tickValue: number | string, _: number, __: Tick[]) => {
							return +tickValue * 100 + '%';
						},
					},
				},
			},
		}
	};

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
