/**
 * This enums represents the different traffic times of the day based on general traffic times and rush hours in Berlin
 *
 * @see https://www.researchgate.net/figure/Segmentation-of-day-time-24-h-into-time-segments-Times-of-the-Day_tbl1_316668245
 * @see https://www.bcdtravel.com/blog/a-business-travelers-guide-to-berlin/
 */
export enum ETrafficTimes {
	/**
	 * Includes all hours of the day
	 */
	ALL_DAY,
	/**
	 * 6:00 - 9:59
	 */
	EARLY_MORNING,
	/**
	 * 7:30 - 9:29
	 */
	EARLY_RUSH_HOUR,
	/**
	 * 10:00 - 11:59
	 */
	LATE_MORNING,
	/**
	 * 12:00 - 13:59
	 */
	EARLY_AFTERNOON,
	/**
	 * 14:00 - 16:59
	 */
	AFTERNOON,
	/**
	 * 15:30 - 17:29
	 */
	LATE_RUSH_HOUR,
	/**
	 * 17:00 - 19:59
	 */
	EVENING,
	/**
	 * 20:00 - 22:59
	 */
	LATE_EVENING,
	/**
	 * 23:00 - 5:59
	 */
	NIGHT,
}

