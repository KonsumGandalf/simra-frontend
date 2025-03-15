import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component, computed,
	effect,
	inject, input,
	model, output, Signal,
	ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MapPage, SafetyMetricsCardComponent } from '@simra/common-components';
import { ETrafficTimes, EWeekDays, EYear, MapPositionInterface } from '@simra/common-models';
import { IRegion, ISafetyMetricsRegion } from '@simra/models';
import { area, centroid, polygon as turfPolygon } from '@turf/turf';
import { LatLng, latLng, Layer, MapOptions, polygon } from 'leaflet';
import { find, first } from 'lodash';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { UIChart } from 'primeng/chart';
import { Divider } from 'primeng/divider';
import { Skeleton } from 'primeng/skeleton';
import { SafetyMetricsService } from '../../../services/safety-metrics.service';
import { getZoomLevelByArea } from '../models/functions/zoom.util';
import { IDetailViewChange } from '../models/interfaces/detail-view-change.interface';

@Component({
	selector: 't-base-region-detail-view',
	imports: [
		CommonModule,
		AutoCompleteModule,
		FormsModule,
		SafetyMetricsCardComponent,
		TranslatePipe,
		UIChart,
		Card,
		Divider,
		ButtonDirective,
		MapPage,
		Skeleton,
	],
	templateUrl: './base-region-detail-view.component.html',
	styleUrl: './base-region-detail-view.component.scss',
	host: {
		class: 't-base-region-detail-view',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseRegionDetailViewComponent {
	private readonly _metricsService = inject(SafetyMetricsService);

	protected readonly _selectedYear = model<EYear>(EYear.ALL);
	protected readonly _selectedWeekDays = model<EWeekDays[]>([EWeekDays.WEEK, EWeekDays.WEEKEND]);
	protected readonly _selectedTrafficTime = model<ETrafficTimes>(ETrafficTimes.ALL_DAY);

	public readonly changeDetails  = output<IDetailViewChange>();

	public readonly safetyMetrics = input.required<ISafetyMetricsRegion>();
	protected readonly _generalSafetyMetrics: Signal<ISafetyMetricsRegion | undefined> = computed(
		() => {
			const safetyMetrics = this._metricsService.safetyMetrics$();
			if (!safetyMetrics) {
				return;
			}

			return find(safetyMetrics, (metrics) => {
				return (
					metrics.weekDay === EWeekDays.ALL_WEEK &&
					metrics.trafficTime === ETrafficTimes.ALL_DAY &&
					metrics.year === EYear.ALL
				);
			});
		},
	);
	public readonly detailedRegion = input.required<IRegion>();
	protected readonly _regionGeometry: Signal<Layer[]> = computed(() => {
		const region = this.detailedRegion();
		if (!region) {
			return [];
		}

		const latLngPolygon = region.way.coordinates.map((ring) =>
			ring.map(([lng, lat]) => latLng(lat, lng)),
		);
		return [polygon(latLngPolygon) as Layer];
	});
	protected readonly _mapOptions$ = computed<MapOptions | undefined>(() => {
		const region = this.detailedRegion();
		if (!region) {
			return;
		}

		const tPoly = turfPolygon(region.way.coordinates);
		const zoom = getZoomLevelByArea(area(tPoly));
		const {
			geometry: {
				coordinates: [lng, lat],
			},
		} = centroid(tPoly);

		return { zoom, center: latLng(lat, lng) };
	});
	public readonly queryOptions = model<MapPositionInterface>();

	constructor() {
		effect(async () => {
			const year = this._selectedYear();
			const weekDays = this._selectedWeekDays();
			const trafficTime = this._selectedTrafficTime();
			if (!year || !weekDays || !trafficTime) {
				this._selectedYear.set(EYear.ALL);
				this._selectedWeekDays.set([EWeekDays.WEEK, EWeekDays.WEEKEND]);
				this._selectedTrafficTime.set(ETrafficTimes.ALL_DAY);
			}
		});

		effect(() => {
			const safetyMetrics = this.safetyMetrics();
			if (!safetyMetrics) {
				return;
			}

			this._metricsService._singleSafetyMetrics$.set(safetyMetrics);
		});

		effect(() => {
			const year = this._selectedYear() || EYear.ALL;
			const trafficTime = this._selectedTrafficTime();
			const weekDays = this._selectedWeekDays();
			const weekDay = weekDays?.length === 1 ? first(weekDays) : EWeekDays.ALL_WEEK;

			this.changeDetails.emit({ year, trafficTime, weekDay });
		});

		effect(() => {
			const mapOptions = this._mapOptions$();
			if (!mapOptions) {
				return;
			}

			const center = mapOptions.center as LatLng;
			this.queryOptions.set({ zoom: mapOptions.zoom + 5, lat: center.lat, lng: center.lng });
		});
	}

	protected readonly _pieMetricsIncidentTypesData =
		this._metricsService.pieMetricsIncidentTypesData$;
	protected readonly _barMetricsRideIncidentDistributionData =
		this._metricsService.barMetricsRideIncidentDistributionData$;
	protected readonly _stackedChartYearMetrics = this._metricsService.stackedBarChartYearMetrics$;
	protected readonly _lineChartYearMetrics = this._metricsService.lineChartYearMetrics$;

	protected readonly _stackedBarChartWeekDaysMetrics$ =
		this._metricsService.stackedBarChartWeekDaysMetrics$;
	protected readonly _lineChartWeekDaysMetrics$ = this._metricsService.lineChartWeekDaysMetrics$;
	protected readonly _lineChartTrafficTimesMetrics$ =
		this._metricsService.lineChartTrafficTimesMetrics$;
	protected readonly _stackedBarChartTrafficTimesMetrics$ =
		this._metricsService.stackedBarChartTrafficTimesMetrics$;
	protected stackedBarChartOptions = this._metricsService.stackBarChartOptions();
	protected lineChartOptions = this._metricsService.lineChartOptions();
	protected readonly _headerPrefix = 'STREETS.EXPLORER.GENERAL.TABLE.HEADER.COLUMNS';
}
