/**
 * This enums represents the different traffic times of the day based on general traffic times and rush hours in Berlin
 *
 * @see https://www.researchgate.net/figure/Segmentation-of-day-time-24-h-into-time-segments-Times-of-the-Day_tbl1_316668245
 * @see https://www.bcdtravel.com/blog/a-business-travelers-guide-to-berlin/
 * @see https://www.essen.de/leben/mobilitaet/verkehrserhebung.de.html
 * @see https://www.berlin.de/sen/uvk/_assets/verkehr/verkehrsmanagement/verkehrserhebungen/ergebnisbericht-2019-teil-a.pdf
 */
export enum ETrafficTimes {

	/**
	 * Includes all hours of the day.
	 */
	ALL_DAY = 'ALL_DAY',

	/**
	 * 7:30 - 9:59
	 */
	MORNING_RUSH_HOUR = 'MORNING_RUSH_HOUR',

	/**
	 * 10:00 - 15:29
	 */
	MID_DAY = 'MID_DAY',

	/**
	 * 15:30 - 18:59
	 */
	EVENING_RUSH_HOUR = 'EVENING_RUSH_HOUR',

	/**
	 * 19:00 - 7:29
	 */
	EVENING_NIGHT_MORNING = 'EVENING_NIGHT_MORNING',

}

