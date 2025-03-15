import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	model,
	ModelSignal,
	ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ETrafficTimes, EWeekDays, EYear, ISafetyMetrics } from '@simra/common-models';
import { ChartData } from 'chart.js';
import { Card } from 'primeng/card';
import { UIChart } from 'primeng/chart';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import {
	ChartDirective,
	EnumSelectButtonComponent,
	EnumSelectComponent,
	SafetyMetricsDigitPanelComponent,
	TRAFFIC_TIMES_TO_TRANSLATION,
	WEEK_DAYS_TO_TRANSLATION,
	YEAR_TO_TRANSLATION,
} from '../../../public-api';
import { CARD_MODE_TO_TRANSLATION_MAP } from '../models/card-mode-to-translation.map';
import { ECardMode } from '../models/card-mode.enum';
import { SafetyMetricsService } from '../services/safety-metrics.service';

@Component({
	selector: 't-safety-metrics-card',
	templateUrl: './safety-metrics-card.component.html',
	styleUrl: './safety-metrics-card.component.scss',
	imports: [
		EnumSelectButtonComponent,
		Card,
		ChartDirective,
		DatePicker,
		EnumSelectComponent,
		FloatLabel,
		SafetyMetricsDigitPanelComponent,
		TranslatePipe,
		UIChart,
		FormsModule,
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 't-safety-metrics-card',
	},
})
export class SafetyMetricsCardComponent {
	public readonly _mode$: ModelSignal<ECardMode> = model<ECardMode>(ECardMode.PRECOMPUTED);

	// static filter options
	public readonly _selectedYear$ = model<EYear>(EYear.ALL);
	public readonly _selectedTrafficTime$ = model<ETrafficTimes>(ETrafficTimes.ALL_DAY);
	public readonly _selectedWeekDays$ = model<EWeekDays[]>([EWeekDays.WEEK, EWeekDays.WEEKEND]);
	public readonly _selectedSafetyMetrics$ = input<ISafetyMetrics>();

	// dynamic filter options
	public readonly _startTime$ = model<Date>(new Date());
	public readonly _endTime$ = model<Date>(new Date());
	public readonly _datetime$ = model<Date[]>([new Date(), new Date()]);

	// data for charts
	private readonly _safetyMetricsService = inject(SafetyMetricsService);
	protected readonly _pieChartOptions =
		this._safetyMetricsService.getPieMetricsIncidentTypesOptions();
	protected readonly _barChartOptions =
		this._safetyMetricsService.getBarMetricsRideIncidentDistributionOptions();
	public readonly _pieChartData$ = input<ChartData>();
	public readonly _barChartData$ = input<ChartData>();

	// references for template
	protected readonly ECardMode = ECardMode;
	protected readonly EYear = EYear;
	protected readonly CARD_MODE_TO_TRANSLATION_MAP = CARD_MODE_TO_TRANSLATION_MAP;
	protected readonly YEAR_TO_TRANSLATION = YEAR_TO_TRANSLATION;
	protected readonly ETrafficTimes = ETrafficTimes;
	protected readonly TRAFFIC_TIMES_TO_TRANSLATION = TRAFFIC_TIMES_TO_TRANSLATION;
	protected readonly WEEK_DAYS_TO_TRANSLATION = WEEK_DAYS_TO_TRANSLATION;
	protected readonly EWeekDays = EWeekDays;
}
