import { ETrafficTimes, EWeekDays, EYear } from '@simra/common-models';

export interface IDetailViewChange {
	year: EYear;
	weekDay: EWeekDays;
	trafficTime: ETrafficTimes;
}
