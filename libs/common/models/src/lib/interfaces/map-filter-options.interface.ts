import { ETrafficTimes } from '../enums/traffic-times.enum';
import { EWeekDays } from '../enums/week-days.enum';
import { EYear } from '../enums/year.enum';


export interface MapFilterOptionsInterface {
	weekDay?: EWeekDays;
	trafficTime?: ETrafficTimes;
	year?: EYear;
}
