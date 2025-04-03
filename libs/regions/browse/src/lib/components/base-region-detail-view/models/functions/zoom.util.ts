export function getZoomLevelByArea(areaSqMeters: number) {
	if (areaSqMeters > 100_000_000_000) return 4; // Large countries
	if (areaSqMeters > 4_000_000_000) return 6; // Medium countries
	if (areaSqMeters > 1_000_000_000) return 8; // Regions, small countries
	if (areaSqMeters > 100_000_000) return 9; // Large cities
	if (areaSqMeters > 1_000_000) return 11; // City districts
	return 15; // Streets, local areas
}
