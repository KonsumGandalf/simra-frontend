import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import {
	ChartColors,
	safetyMetricsDisplayArray,
	TRAFFIC_TIMES_TO_TRANSLATION,
	TTranslationMap,
	WEEK_DAYS_TO_TRANSLATION,
} from '@simra/common-components';
import { ETrafficTimes, EWeekDays, EYear } from '@simra/common-models';
import { getEnumOrder } from '@simra/common-utils';
import { ISafetyMetricsRegion } from '@simra/models';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { drop, map, orderBy, values } from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class SafetyMetricsService {
	private readonly _translationService = inject(TranslateService);
	private readonly _onLangChange$ = toSignal(this._translationService.onLangChange);
	public readonly _singleSafetyMetrics$ = signal<ISafetyMetricsRegion | undefined>(undefined);
	public readonly safetyMetrics$ = signal<ISafetyMetricsRegion[]>([]);

	const

	/**
	 * Generates pie chart data for incident types
	 */
	public readonly pieMetricsIncidentTypesData$: Signal<ChartData | undefined> = computed(() => {
		const metrics = this._singleSafetyMetrics$();
		if (!metrics) return undefined;

		const displayMetrics = drop(safetyMetricsDisplayArray(metrics), 5).filter(
			(res) => res.data !== 0,
		);
		if (displayMetrics.length < 1) return undefined;

		const labels = values(
			this._translationService.instant(displayMetrics.map(({ label }) => label)),
		);

		return {
			datasets: [{ data: displayMetrics.map((value) => value.data) }],
			labels,
		};
	});

	/**
	 * Generates pie chart data for incident types
	 */
	barMetricsRideIncidentDistributionData$: Signal<ChartData | undefined> = computed(() => {
		const metrics = this._singleSafetyMetrics$();
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
				},
			],
			labels: values(translatedLabels),
		};
	});

	/**
	 * Generates pie chart data for incident types
	 */
	public readonly stackedBarChartTrafficTimesMetrics$ = this.createStackedBarChartData(
		'trafficTime',
		TRAFFIC_TIMES_TO_TRANSLATION,
		(metric) =>
			metric.trafficTime !== ETrafficTimes.ALL_DAY &&
			metric.weekDay === EWeekDays.ALL_WEEK &&
			metric.year === EYear.ALL,
		(metric) => getEnumOrder(ETrafficTimes, metric.trafficTime)
	);

	/**
	 * Generates pie chart data for incident types
	 */
	public readonly stackedBarChartWeekDaysMetrics$ = this.createStackedBarChartData(
		'weekDay',
		WEEK_DAYS_TO_TRANSLATION,
		(metric) =>
			metric.trafficTime === ETrafficTimes.ALL_DAY &&
			metric.weekDay !== EWeekDays.ALL_WEEK &&
			metric.year === EYear.ALL,
		(metric) => getEnumOrder(EWeekDays, metric.weekDay)
	);

	/**
	 * Generates pie chart data for incident types
	 */
	public readonly stackedBarChartYearMetrics$ = this.createStackedBarChartData(
		'year',
		undefined,
		(metric) =>
			metric.trafficTime === ETrafficTimes.ALL_DAY &&
			metric.weekDay === EWeekDays.ALL_WEEK &&
			metric.year !== EYear.ALL,
	);


	/**
	 * Generates common line chart data
	 */
	public readonly lineChartYearMetrics$ = this.createLineChartData(
		'year',
		undefined,
		(metric) =>
			metric.trafficTime === ETrafficTimes.ALL_DAY &&
			metric.weekDay === EWeekDays.ALL_WEEK &&
			metric.year !== EYear.ALL,
	);


	/**
	 * Generates common line chart data
	 */
	public readonly lineChartWeekDaysMetrics$ = this.createLineChartData(
		'weekDay',
		WEEK_DAYS_TO_TRANSLATION,
		(metric) =>
			metric.trafficTime === ETrafficTimes.ALL_DAY &&
			metric.weekDay !== EWeekDays.ALL_WEEK &&
			metric.year === EYear.ALL,
		(metric) => getEnumOrder(EWeekDays, metric.weekDay)
	);


	/**
	 * Generates common line chart data
	 */
	public readonly lineChartTrafficTimesMetrics$ = this.createLineChartData(
		'trafficTime',
		TRAFFIC_TIMES_TO_TRANSLATION,
		(metric) =>
			metric.trafficTime !== ETrafficTimes.ALL_DAY &&
			metric.weekDay === EWeekDays.ALL_WEEK &&
			metric.year === EYear.ALL,
		(metric) => getEnumOrder(ETrafficTimes, metric.trafficTime) // ✅ Ensure it returns a value, not a function
	);

	/**
	 * Generates common line chart data
	 *
	 * @param key
	 * @param translationMap
	 * @param filterFn
	 * @param orderFn
	 * @private
	 */
	private createStackedBarChartData(
		key: string,
		translationMap?: TTranslationMap<string>,
		filterFn?: (metric: ISafetyMetricsRegion) => boolean,
		orderFn?: (m: ISafetyMetricsRegion) => number,
	) {
		return computed(() => {
			this._onLangChange$();
			let metrics = this.safetyMetrics$();
			if (filterFn) metrics = metrics.filter(filterFn);
			metrics = orderBy(metrics, orderFn ? [(m) => orderFn(m)] : [key], ['asc']);

			if (metrics.length < 1) return;

			const labels = this.getTranslatedLabels(metrics, key, translationMap);
			let datasets = [{
				type: 'line',
				label: this._translationService.instant(
					'STREETS.EXPLORER.GENERAL.TABLE.HEADER.COLUMNS.SCORE',
				),
				data: metrics.map((metric) => metric.dangerousScore),
				yAxisID: 'y1',
				tension: 0.3,
			}, ...this.createIncidentTypesDatasets(metrics)];
			datasets = datasets.map((data, index) => {
				return {
					...data,
					backgroundColor: ChartColors.INCIDENT_TYPES_WITH_SCORE[index],
					borderColor: ChartColors.INCIDENT_TYPES_WITH_SCORE[index],
				}
			});

			return { labels, datasets };
		});
	}

	/**
	 * Generates common line chart data
	 *
	 * @param key
	 * @param translationMap
	 * @param filterFn
	 * @param orderFn
	 * @private
	 */
	private createLineChartData(
		key: string,
		translationMap?: TTranslationMap<string>,
		filterFn?: (metric: ISafetyMetricsRegion) => boolean,
		orderFn?: (m: ISafetyMetricsRegion) => boolean | number,
	) {
		return computed(() => {
			this._onLangChange$();
			let metrics = this.safetyMetrics$();
			if (filterFn) metrics = metrics.filter(filterFn);
			metrics = orderBy(metrics, orderFn ? [(m) => orderFn(m)] : [key], ['asc']);

			if (metrics.length < 1) return;

			const labels = this.getTranslatedLabels(metrics, key, translationMap);
			const lineDatasets = [
				{
					type: 'line',
					label: this._translationService.instant(
						'STREETS.EXPLORER.GENERAL.TABLE.HEADER.COLUMNS.SCORE',
					),
					data: metrics.map((metric) => metric.dangerousScore),
					yAxisID: 'y2',
				},
				{
					type: 'line',
					label: this._translationService.instant(
						'STREETS.EXPLORER.GENERAL.TABLE.HEADER.COLUMNS.DISTANCE_PER_RIDE',
					),
					data: metrics.map((metric) => (metric.totalDistance / metric.numberOfRides) / 1000),
					yAxisID: 'y1',
				},
				{
					type: 'line',
					label: this._translationService.instant(
						'REGIONS.BROWSE.GENERAL.ANALYSIS.PERCENTAGE_SCARY'
					),
					data: metrics.map((metric) => metric.numberOfScaryIncidents / metric.numberOfIncidents),
					yAxisID: 'y3',
				}
			];

			const barDatasets = this.createRidesDatasets(metrics);
			let datasets = [...lineDatasets, ...barDatasets];

			datasets = datasets.map((data, index) => ({
				...data,
				backgroundColor: ChartColors.RIDE_METRICS_DISTRIBUTION_WITH_SCORE[index],
				borderColor: ChartColors.RIDE_METRICS_DISTRIBUTION_WITH_SCORE[index],
				tension: 0.3,
			}));


			return { labels, datasets };
		});
	}

	/**
	 * Utility function to get translated labels
	 *
	 * @param metrics
	 * @param key
	 * @param translationMap
	 * @private
	 */
	private getTranslatedLabels(
		metrics: ISafetyMetricsRegion[],
		key: string,
		translationMap?: TTranslationMap<string>,
	) {
		let labels = map(metrics, key);
		if (translationMap) {
			labels = map(labels, (value) =>
				this._translationService.instant(translationMap[value]?.label),
			);
		}
		return labels;
	}

	/**
	 * Utility function to generate bar chart datasets
	 *
	 * @param metrics
	 * @private
	 */
	private createIncidentTypesDatasets(metrics: ISafetyMetricsRegion[]): ChartDataset[] {
		const metricKeys = drop(safetyMetricsDisplayArray(metrics[0]), 5);
		return metricKeys
			.map((metric) => ({
				type: 'bar',
				label: this._translationService.instant(metric.label),
				data: metrics.map((m) => {
					const metricValues = drop(safetyMetricsDisplayArray(m), 5);
					const matchingMetric = metricValues.find((mt) => mt.label === metric.label);
					return matchingMetric ? matchingMetric.data : 0;
				}),
			}))
			.filter((dataset) => dataset.data.some((data) => data !== 0)) as ChartDataset[];
	}

	/**
	 * Utility function to generate bar chart datasets
	 *
	 * @param metrics
	 * @private
	 */
	private createRidesDatasets(metrics: ISafetyMetricsRegion[]): ChartDataset[] {
		const metricKeys = safetyMetricsDisplayArray(metrics[0]).slice(2, 5);
		return metricKeys
			.map((metric) => ({
				type: 'bar',
				maxBarThickness: 40,
				label: this._translationService.instant(metric.label),
				data: metrics.map((m) => {
					const metricValues = safetyMetricsDisplayArray(m).slice(2, 5);
					const matchingMetric = metricValues.find((mt) => mt.label === metric.label);
					return matchingMetric ? matchingMetric.data : 0;
				}),
			})) as ChartDataset[];
	}

	/**
	 * Utility function to generate line chart datasets
	 */
	public lineChartOptions(): ChartOptions {
		return {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: { stacked: false, offset: true },
				y: { stacked: false },
				y1: {
					position: 'right',
					display: false,
					grid: { drawOnChartArea: false },
				},
				y2: {
					position: 'right',
					display: false,
					grid: { drawOnChartArea: false },
				},
				y3: {
					position: 'right',
					display: false,
					grid: { drawOnChartArea: false },
				}
			},
		};
	}

	/**
	 * Utility function to generate stacked bar chart options
	 */
	public stackBarChartOptions(): ChartOptions {
		return {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: { stacked: true },
				y: { stacked: true },
				y1: {
					position: 'right',
					display: false,
					grid: { drawOnChartArea: false },
				}
			}
		};
	}
}
