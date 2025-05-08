import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	effect,
	model,
	output,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
	EnumColumn,
	EnumMultiSelectComponent,
	isEnumColumn,
	isNumberColumn, LastRunComponent,
	NumberColumn,
	NumberFilterComponent,
	TRAFFIC_TIMES_TO_TRANSLATION,
	WEEK_DAYS_TO_TRANSLATION,
	YEAR_TO_TRANSLATION,
} from '@simra/common-components';
import { Column, ESortOrder, ETrafficTimes, EWeekDays, EYear, IPage } from '@simra/common-models';
import { ISafetyMetricsRequest } from '@simra/streets-common';
import { times } from 'lodash';
import { MarkdownComponent } from 'ngx-markdown';
import { Card } from 'primeng/card';
import { Skeleton } from 'primeng/skeleton';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { ISafetyMetrics } from '@simra/streets-common';
import { HIGHWAY_TYPES_TO_TRANSLATION } from '@simra/streets-explorer';
import { scoreFormulaMarkdownRegion } from '../../utils/markdown';

@Component({
	selector: 't-base-region-list-view',
	imports: [
		CommonModule,
		Card,
		TableModule,
		EnumMultiSelectComponent,
		TranslatePipe,
		NumberFilterComponent,
		RouterLink,
		Tooltip,
		Skeleton,
		LastRunComponent,
		MarkdownComponent,
	],
	templateUrl: './base-region-list-view.component.html',
	styleUrl: './base-region-list-view.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 't-base-region-list-view',
	},
	encapsulation: ViewEncapsulation.None,
})
export class BaseRegionListViewComponent {
	safetyMetrics = model.required<IPage<ISafetyMetrics>>();
	lastRun = model.required<Date>();

	/**
	 * The index of the current page
	 * @protected
	 */
	protected index = 0;
	/**
	 * Indicates if the table is loading with skeleton+
	 */
	public readonly loading = model<boolean>();
	private readonly _headerPrefix = 'STREETS.EXPLORER.GENERAL.TABLE.HEADER.COLUMNS';
	/**
	 * Defines the columns which are displayed in the table
	 * @protected
	 */
	protected readonly _cols: Column[] = [
		{ header: `${this._headerPrefix}.NAME`, field: 'name' },
		{
			header: `REGIONS.BROWSE.GENERAL.ENTITY_ATTRIBUTES.REGION.SCORE.LABEL`,
			field: 'dangerousScore',
			min: 0,
			step: 0.05,
			sortable: true,
		} as NumberColumn,
		{
			header: `${this._headerPrefix}.RIDES`,
			field: 'numberOfRides',
			min: 1,
			step: 10,
			sortable: true,
		} as NumberColumn,
		{
			header: `${this._headerPrefix}.INCIDENTS`,
			field: 'numberOfIncidents',
			min: 1,
			step: 10,
			sortable: true,
		} as NumberColumn,
		{
			header: `${this._headerPrefix}.WEEKDAY`,
			field: 'weekDay',
			enum: EWeekDays,
			translationMap: WEEK_DAYS_TO_TRANSLATION,
			sortable: true,
		} as EnumColumn<EWeekDays>,
		{
			header: `${this._headerPrefix}.TRAFFIC_TIME`,
			field: 'trafficTime',
			enum: ETrafficTimes,
			translationMap: TRAFFIC_TIMES_TO_TRANSLATION,
			sortable: true,
		} as EnumColumn<ETrafficTimes>,
		{
			header: `${this._headerPrefix}.YEAR`,
			enum: EYear,
			translationMap: YEAR_TO_TRANSLATION,
			field: 'year',
			sortable: false,
		} as EnumColumn<EYear>,
	];

	protected readonly _filtering$ = signal<ISafetyMetricsRequest>({
		size: 20,
		weekDay: [EWeekDays.ALL_WEEK],
		trafficTime: [ETrafficTimes.ALL_DAY],
		year: [EYear.ALL],
		minNumberOfRides: 100,
		sort: 'dangerousScore,DESC',
	});
	public filtering = output<ISafetyMetricsRequest>();

	constructor() {
		effect(() => {
			const filtering = this._filtering$();
			this.filtering.emit(filtering);
		});
	}

	/**
	 * Called when paginating the table
	 * @param event
	 */
	onLazy(event: TableLazyLoadEvent) {
		this._filtering$.update((oldValues) => ({
			...oldValues,
			page: event.first / event.rows,
			size: event.rows,
		}));
	}

	/**
	 * Called when filtering the table
	 * @param event
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onFilterChange(event: any) {
		let newFilter = {};
		if (event.filters) {
			for (const filter in event.filters) {
				newFilter[filter] = event.filters[filter].value;
			}
		} else {
			newFilter = event;
		}

		this.index = 0;
		this._filtering$.update((oldValues) => ({
			...oldValues,
			...newFilter,
		}));
	}

	/**
	 * Called when sorting the table
	 * @param event
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected onSort(event: any) {
		const sort = event.field === 'id' ? 'planetOsmLineId' : event.field;
		const order = event.order === 1 ? ESortOrder.ASC : ESortOrder.DESC;
		this._filtering$.update((oldValues) => ({
			...oldValues,
			sort: `${sort},${order}`,
		}));
	}

	/**
	 * The following methods are just references for the template
	 */
	protected readonly TRAFFIC_TIMES_TO_TRANSLATION = TRAFFIC_TIMES_TO_TRANSLATION;
	protected readonly WEEK_DAYS_TO_TRANSLATION = WEEK_DAYS_TO_TRANSLATION;
	protected readonly HIGHWAY_TYPES_TO_TRANSLATION = HIGHWAY_TYPES_TO_TRANSLATION;
	protected readonly YEAR_TO_TRANSLATION = YEAR_TO_TRANSLATION;
	protected readonly isEnumColumn = isEnumColumn;
	protected readonly isNumberColumn = isNumberColumn;
	protected readonly times = times;

	protected isBasicColumn(column: Column): Column | undefined {
		if (!this.isEnumColumn(column) && !this.isNumberColumn(column)) {
			return column as Column;
		}
		return undefined;
	}

	protected readonly scoreFormulaMarkdownRegion = scoreFormulaMarkdownRegion;
}
