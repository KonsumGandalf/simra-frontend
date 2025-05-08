export function getZoomLevelByArea(areaSqMeters: number) {
	if (areaSqMeters > 100_000_000_000) return 3; // Large countries
	if (areaSqMeters > 4_000_000_000) return 5; // Medium countries
	if (areaSqMeters > 1_000_000_000) return 7; // Regions, small countries
	if (areaSqMeters > 100_000_000) return 8; // Large cities
	if (areaSqMeters > 1_000_000) return 10; // City districts
	return 15; // Streets, local areas
}
