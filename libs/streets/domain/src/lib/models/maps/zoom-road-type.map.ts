const ROAD_TYPE_11 = ['primary', 'primary_link'];
const ROAD_TYPE_13 = [...ROAD_TYPE_11, 'secondary', 'secondary_link'];
const ROAD_TYPE_14 = [...ROAD_TYPE_13, 'tertiary', 'tertiary_link'];
const ROAD_TYPE_15 = [
	...ROAD_TYPE_14,
	'unclassified',
	'residential',
	'living_street',
	'bridleway'
];

export const ZOOM_ROAD_TYPE_MAP: Record<number, string[]> = {
	11: ROAD_TYPE_11,
	13: ROAD_TYPE_13,
	14: ROAD_TYPE_14,
	15: ROAD_TYPE_15,
	16: ROAD_TYPE_15,
	17: ROAD_TYPE_15,
	18: ROAD_TYPE_15,
	19: ROAD_TYPE_15,
	20: ROAD_TYPE_15,
	21: ROAD_TYPE_15,
};

export const ROAD_TYPE_MIN_ZOOM: Record<string, number> = {
	motorways:    0, // always show if you wanted…
	primary:     11,
	primary_link:11,
	secondary:   13,
	secondary_link:13,
	tertiary:    14,
	tertiary_link:14,
	unclassified:15,
	residential: 15,
	living_street:15,
	bridleway:   15,
	// …etc
};
