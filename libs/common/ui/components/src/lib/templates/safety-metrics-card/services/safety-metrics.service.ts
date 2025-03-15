import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartOptions } from 'chart.js';
import { Tick } from 'chart.js/dist/types';

@Injectable({
	providedIn: 'root',
})
export class SafetyMetricsService {
	private readonly _translationService = inject(TranslateService);

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
}
