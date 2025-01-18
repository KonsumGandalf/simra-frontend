import { ETrafficTimes } from '../enums/traffic-times.enum';
import { EWeekDays } from '../enums/week-days.enum';


export interface MapFilterOptionsInterface {
	weekDay?: EWeekDays;
	trafficTime?: ETrafficTimes;
}
