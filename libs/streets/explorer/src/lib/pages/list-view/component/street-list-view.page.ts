import {
	ChangeDetectionStrategy,
	Component,
	inject,
	resource,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import {
	EnumColumn,
	EnumMultiSelectComponent,
	HIGHWAY_TYPES_TO_TRANSLATION,
	isEnumColumn,
	isNumberColumn,
	NumberColumn,
	NumberFilterComponent,
	TRAFFIC_TIMES_TO_TRANSLATION,
	WEEK_DAYS_TO_TRANSLATION,
} from '@simra/common-components';
import { Column, EHighwayTypes, ESortOrder, ETrafficTimes, EWeekDays } from '@simra/common-models';
import { SafetyMetricsRequest } from '@simra/streets-common';
import { StreetListViewFacade } from '@simra/streets-domain';
import { times } from 'lodash';
import { PrimeTemplate } from 'primeng/api';
import { Card } from 'primeng/card';
import { Skeleton } from 'primeng/skeleton';
import { TableLazyLoadEvent } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 't-street-list-view',
	standalone: true,
	imports: [
		CommonModule,
		PrimeTemplate,
		TableModule,
		TranslatePipe,
		Tooltip,
		Card,
		Skeleton,
		TranslateModule,
		FormsModule,
		NumberFilterComponent,
		EnumMultiSelectComponent,
	],
	templateUrl: './street-list-view.page.html',
	styleUrl: './street-list-view.page.scss',
	host: {
		class: 't-street-list-view',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreetListViewPage {
	private readonly _streetListViewFace = inject(StreetListViewFacade);
	/**
	 * The index of the current page
	 * @protected
	 */
	protected index = 0;
	/**
	 * Indicates if the table is loading with skeleton
	 * @protected
	 */
	protected readonly loading = signal<boolean>(false);
	private readonly _headerPrefix = 'COMPONENTS.GENERAL.TABLE.HEADER.COLUMNS';
	/**
	 * Defines the columns which are displayed in the table
	 * @protected
	 */
	protected readonly _cols: Column[] = [
		{ header: `${this._headerPrefix}.ID`, field: 'id', sortable: true },
		{ header: `${this._headerPrefix}.NAME`, field: 'name' },
		{
			header: `${this._headerPrefix}.HIGHWAY_TYPE`,
			field: 'highway',
			enum: EHighwayTypes,
			translationMap: HIGHWAY_TYPES_TO_TRANSLATION,
		} as EnumColumn<EHighwayTypes>,
		{
			header: `${this._headerPrefix}.SCORE`,
			field: 'dangerousScore',
			min: 0,
			step: 0.05,
			sortable: true,
		} as NumberColumn,
		{
			header: `${this._headerPrefix}.RIDES`,
			field: 'numberOfRides',
			min: 0,
			step: 10,
			sortable: true,
		} as NumberColumn,
		{
			header: `${this._headerPrefix}.INCIDENTS`,
			field: 'numberOfIncidents',
			min: 0,
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
	];

	protected readonly filtering = signal<SafetyMetricsRequest>({
		size: 20,
		weekDay: [EWeekDays.ALL_WEEK],
		trafficTime: [ETrafficTimes.ALL_DAY],
		minNumberOfRides: 30,
		sort: 'dangerousScore,DESC',
	});
	protected readonly _streets$ = resource({
		request: () => ({ ...this.filtering() }),
		loader: async ({ request }) => {
			this.loading.set(true);
			const response = await firstValueFrom(
				this._streetListViewFace.fetchStreetList(request),
			);
			this.loading.set(false);
			return response;
		},
	});

	/**
	 * Called when paginating the table
	 * @param event
	 */
	onLazy(event: TableLazyLoadEvent) {
		this.filtering.update((oldValues) => ({
			...oldValues,
			page: event.first / event.rows,
			size: event.rows,
		}));
	}

	/**
	 * Called when filtering the table
	 * @param event
	 */
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
		this.filtering.update((oldValues) => ({
			...oldValues,
			...newFilter,
		}));
	}

	/**
	 * Called when sorting the table
	 * @param event
	 */
	onSort(event: any) {
		const sort = event.field === 'id' ? 'planetOsmLineId' : event.field;
		const order = event.order === 1 ? ESortOrder.ASC : ESortOrder.DESC;
		this.filtering.update((oldValues) => ({
			...oldValues,
			sort: `${sort},${order}`,
		}));
	}

	protected isBasicColumn(column: Column): Column | undefined {
		if (!this.isEnumColumn(column) && !this.isNumberColumn(column)) {
			return column as Column;
		}
		return undefined;
	}

	/**
	 * The following methods are just references for the template
	 */
	protected readonly TRAFFIC_TIMES_TO_TRANSLATION = TRAFFIC_TIMES_TO_TRANSLATION;
	protected readonly WEEK_DAYS_TO_TRANSLATION = WEEK_DAYS_TO_TRANSLATION;
	protected readonly HIGHWAY_TYPES_TO_TRANSLATION = HIGHWAY_TYPES_TO_TRANSLATION;
	protected readonly isEnumColumn = isEnumColumn;
	protected readonly isNumberColumn = isNumberColumn;
	protected readonly times = times;
}
