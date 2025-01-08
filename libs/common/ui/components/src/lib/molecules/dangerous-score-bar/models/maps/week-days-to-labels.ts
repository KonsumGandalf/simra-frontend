import { EWeekDays } from '../enums/week-days.enum';
import { MapSelectOptions } from '../interfaces/map-select-options.interface';

export const WeekDaysToLabels: Record<EWeekDays, MapSelectOptions> = {
	[EWeekDays.MONDAY]: {
		label: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.LABEL.MONDAY',
		tooltip: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.TOOLTIP.MONDAY',
	},
	[EWeekDays.TUESDAY]: {
		label: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.LABEL.TUESDAY',
		tooltip: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.TOOLTIP.TUESDAY',
	},
	[EWeekDays.WEDNESDAY]: {
		label: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.LABEL.WEDNESDAY',
		tooltip: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.TOOLTIP.WEDNESDAY',
	},
	[EWeekDays.THURSDAY]: {
		label: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.LABEL.THURSDAY',
		tooltip: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.TOOLTIP.THURSDAY',
	},
	[EWeekDays.FRIDAY]: {
		label: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.LABEL.FRIDAY',
		tooltip: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.TOOLTIP.FRIDAY',
	},
	[EWeekDays.SATURDAY]: {
		label: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.LABEL.SATURDAY',
		tooltip: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.TOOLTIP.SATURDAY',
	},
	[EWeekDays.SUNDAY]: {
		label: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.LABEL.SUNDAY',
		tooltip: 'COMPONENTS.MOLECULES.DANGEROUS_SCORE_BAR.WEEK_DAYS.TOOLTIP.SUNDAY',
	},
}
