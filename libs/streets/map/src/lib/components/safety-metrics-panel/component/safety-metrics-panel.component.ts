import { ChangeDetectionStrategy, Component, computed, inject, input, Signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SafetyMetricsDto } from '@simra/streets-common';
import { ChartData } from 'chart.js';
import { ChartOptions, Tick } from 'chart.js/dist/types';
import { drop, times, values } from 'lodash';
import { Card } from 'primeng/card';
import { Carousel } from 'primeng/carousel';
import { UIChart } from 'primeng/chart';
import { safetyMetricsDisplayArray } from '../../../models/const';
import { SafetyMetricsDigitPanelComponent } from '../../safety-metrics-digit-panel/component/safety-metrics-digit-panel.component';

@Component({
	selector: 'm-safety-metrics-panel',
	standalone: true,
	imports: [
		CommonModule,
		Carousel,
		SafetyMetricsDigitPanelComponent,
		UIChart,
		TranslatePipe,
		Card,
	],
	templateUrl: './safety-metrics-panel.component.html',
	styleUrl: './safety-metrics-panel.component.scss',
	host: {
		class: 'm-safety-metrics-panel',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class SafetyMetricsPanelComponent {
	protected readonly _translationService = inject(TranslateService);

	public readonly safetyMetrics$ = input<SafetyMetricsDto>();

	protected readonly _pieMetricsIncidentTypesOptions: ChartOptions;
	protected readonly _pieMetricsIncidentTypesData$: Signal<(ChartData | undefined)>;
	protected readonly _metricsIncidentTypes$ = computed(() => {
		const metrics = this.safetyMetrics$();
		if (!metrics) {
			return;
		}

		return drop(safetyMetricsDisplayArray(metrics), 5).filter(res => res.data != 0);
	});

	protected readonly _barMetricsRideIncidentDistributionOptions: ChartOptions;
	protected readonly _barMetricsRideIncidentDistributionData$: Signal<(ChartData | undefined)>;


	constructor() {
		this._pieMetricsIncidentTypesData$ = computed(() => {
			const metrics = this.safetyMetrics$();
			if (!metrics) {
				return;
			}
			const displayMetrics = drop(safetyMetricsDisplayArray(metrics), 5).filter(res => res.data != 0)

			if (!displayMetrics || displayMetrics.length < 1) {
				return undefined;
			}

			const labels =  displayMetrics.map(({ label }) => label);

			const translatedLabels = this._translationService.instant(labels);
			return {
				datasets: [{ data: displayMetrics.map((value) => value.data) }],
				labels: values(translatedLabels),
			}
		});
		this._pieMetricsIncidentTypesOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				title: {
					display: true,
					text: this._translationService.instant('STREETS.MAP.COMPONENTS.SAFETY_METRICS_PANEL.CHARTS.INCIDENT_TYPES.TITLE'),
					padding: {
						top: 5,
					}
				}
			}
		}

		this._barMetricsRideIncidentDistributionData$ = computed(() => {

			const metrics = this.safetyMetrics$();
			if (!metrics) {
				return;
			}
			const displayMetrics = safetyMetricsDisplayArray(metrics).slice(2, 5)

			if (!displayMetrics || displayMetrics.length < 1) {
				return undefined;
			}

			const labels =  displayMetrics.map(({ label }) => label);

			const translatedLabels = this._translationService.instant(labels);
			return {
				datasets: [{
					data: displayMetrics.map((value) => value.data),
					backgroundColor: ['#36a2eb', '#ffcd56', '#ff6483'],
				}],
				labels: values(translatedLabels)
			}
		});

		this._barMetricsRideIncidentDistributionOptions = {
			responsive: true,
			aspectRatio: 0.6,
			plugins: {
				title: {
					display: true,
					text: this._translationService.instant('STREETS.MAP.COMPONENTS.SAFETY_METRICS_PANEL.CHARTS.RIDE_INCIDENT_DISTRIBUTION.TITLE'),
					padding: {
						top: 5,
						bottom: 20
					},
				},
				legend: {
					display: false
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						count: 11
					}
				},
				right: {
					beginAtZero: true,
					position: 'right',
					ticks: {
						count: 11,
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						callback: ((tickValue: number | string, _: number, __: Tick[]) => {
							return +tickValue * 100 + '%';
						})
					}
				}
			}
		}
	}

	protected readonly _templatePages$ = computed(() => {
		let numberOfPages = 3;
		const safetyMetrics = this.safetyMetrics$();
		if (!safetyMetrics) {
			return times(1);
		}

		const safetyMetricsArray = safetyMetricsDisplayArray(safetyMetrics);
		const pieMetrics = drop(safetyMetricsArray, 5).filter(res => res.data != 0);

		if (!this._pieMetricsIncidentTypesData$() || pieMetrics.length < 1) {
			numberOfPages -= 1;
		}
		return times(numberOfPages);
	});
}
