export function getZoomLevelByArea(areaSqMeters: number) {
	if (areaSqMeters > 100_000_000_000) return 3; // Continents, large countries
	if (areaSqMeters > 10_000_000_000) return 5; // Large countries
	if (areaSqMeters > 4_000_000_000) return 6; // Large countries
	if (areaSqMeters > 1_000_000_000) return 7; // Regions, small countries
	if (areaSqMeters > 100_000_000) return 9; // Large cities
	if (areaSqMeters > 1_000_000) return 12; // City districts
	return 15; // Streets, local areas
}
