/**
 * Types of cycleway lanes
 * @see https://wiki.openstreetmap.org/wiki/Key:cycleway:lane
 * @see https://wiki.openstreetmap.org/wiki/Key:cycleway:right
 */
export enum ECyclewayType {
	ADVISORY = 'advisory',
	EXCLUSIVE = 'exclusive',
	PICTOGRAM = 'pictogram',

	SHARED_LANE = 'shared_lane',
	LANE = 'lane',
	TRACK = 'track',
	SHARED_BUSWAY = 'shared_busway',
	SEPARATE = 'separate',

	NO = 'no',

	UNKNOWN = 'unknown'
}
