export class ChartColors {
	static SCORE = '#7c86ff';
	static INCIDENT_TYPES = [
		'#a3c4f3', // jordy-blue
		'#90dbf4', // non-photo-blue
		'#8eecf5', // electric-blue
		'#98f5e1', // aquamarine
		'#b9fbc0', // celadon
		'#cfbaf0', // mauve
		'#f1c0e8', // pink-lavender
		'#ffcfd2', // tea-rose-red
		'#fde4cf', // champagne-pink
		'#fbf8cc', // lemon-chiffon
	];
	static INCIDENT_TYPES_WITH_SCORE = [ChartColors.SCORE, ...ChartColors.INCIDENT_TYPES];
	static RIDE_METRICS_DISTRIBUTION = ['#fef9c2', '#ffd6a7', '#ffc9c9'];
	static RIDE_METRICS_DISTRIBUTION_WITH_SCORE = [ChartColors.SCORE, '#ddd6ff', '#e9d4ff', ...ChartColors.RIDE_METRICS_DISTRIBUTION];
}
