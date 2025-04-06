import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EGroupType, IProfileGroupAssociation, ISafetyMetricsProfile } from '@simra/models';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { orderBy } from 'lodash';
import { getAgeSortOrder, getExperienceSortOrder } from '../models/order-functions';

@Injectable({
	providedIn: 'root',
})
export class ProfileSafetyMetricsService {
	private readonly _translationService = inject(TranslateService);
	public readonly safetyMetrics$ = signal<IProfileGroupAssociation[]>([]);

	private readonly _translationLocalKeyPrefix = 'REGIONS.BROWSE.COMPONENTS.PROFILE_CARD.GROUPS';
	private readonly _translationEntityKeyPrefix = 'STREETS.EXPLORER.GENERAL.TABLE.HEADER.COLUMNS';

	/**
	 * Generates line chart data for AGE-based safety metrics
	 */
	public readonly barChartAgeMetrics$: Signal<ChartData | undefined> = computed(() => {
		return this.createBarChartData(EGroupType.AGE)();
	});

	public readonly barChartGenderMetrics$: Signal<ChartData | undefined> = computed(() => {
		return this.createBarChartData(EGroupType.GENDER)();
	});

	public readonly barChartBehaviourMetrics$: Signal<ChartData | undefined> = computed(() => {
		return this.createBarChartData(EGroupType.BEHAVIOR)();
	});

	public readonly barChartExperienceMetrics$: Signal<ChartData | undefined> = computed(() => {
		return this.createBarChartData(EGroupType.EXPERIENCE)();
	});

	/**
	 * Creates a computed signal for bar chart data based on the given group type.
	 * @param groupType The group type (AGE, GENDER, etc.).
	 */
	private createBarChartData(groupType: EGroupType): Signal<ChartData | undefined> {
		return computed(() => {
			const metrics = this.safetyMetrics$();
			if (!metrics) return undefined;

			const groupData = metrics.find((group) => group.groupType === groupType);
			if (!groupData || !groupData.groupValue || groupData.groupValue.length === 0) return undefined;

			let sortedData: ISafetyMetricsProfile[] = orderBy(
				groupData.groupValue,
				(entry) => entry.groupName === 'NOT_CHOSEN' || entry.groupName === '-1' ? 'x' : entry.groupName,
				['asc']
			);

			switch (groupType) {
				case 'AGE':
					sortedData = orderBy(
						groupData.groupValue,
						(entry) => getAgeSortOrder(entry.groupName),
						['asc']
					);
					break;

				case 'EXPERIENCE':
					sortedData = orderBy(
						groupData.groupValue,
						(entry) => getExperienceSortOrder(entry.groupName),
						['asc']
					);
					break;
			}


			let labels = sortedData.map((entry) => entry.groupName);
			labels = labels.map((label) => this._translationService.instant(`${this._translationLocalKeyPrefix}.${groupType}.${label}`));

			let datasets: ChartDataset[] = [
				{
					label: this._translationService.instant(`${this._translationEntityKeyPrefix}.INCIDENTS`),
					data: sortedData.map((entry) => entry.totalIncidents),
				},
				{
					label: this._translationService.instant(`${this._translationEntityKeyPrefix}.SCARY_INCIDENTS`),
					data: sortedData.map((entry) => entry.totalScaryIncidents),
				},
				{
					label: this._translationService.instant(`${this._translationEntityKeyPrefix}.RIDES`),
					data: sortedData.map((entry) => entry.totalRides),
				},
				{
					label: this._translationService.instant(`${this._translationEntityKeyPrefix}.SCORE`),
					data: sortedData.map((entry) => entry.dangerousScore),
					yAxisID: 'y1',
					type: 'line',
				},
			];

			datasets = datasets.map((data) => ({
				...data,
				fill: false,
				tension: 0.3,
			}));

			return { labels, datasets };
		});
	}

	public barChartAgeOptions(): ChartOptions {
		return {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					display: true,
				},
				y1: {
					position: 'right',
					display: false,
					grid: { drawOnChartArea: false },
				}
			},
		};
	}
}
