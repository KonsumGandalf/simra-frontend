import { EWeekDays } from '@simra/common-models';
import { MapSelectOptions } from '../interfaces/map-select-options.interface';

export const WeekDaysToLabels: Partial<Record<EWeekDays, MapSelectOptions>> = {
	[EWeekDays.WEEK]: {
		label: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.LABEL.WEEK',
		tooltip: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.TOOLTIP.WEEK',
	},
	[EWeekDays.WEEKEND]: {
		label: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.LABEL.WEEKEND',
		tooltip: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.TOOLTIP.WEEKEND',
	}
}
