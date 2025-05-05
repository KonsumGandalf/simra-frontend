export class ChartColors {
	static SCORE = '#7c86ff';
	static INCIDENT_TYPES = [
		'#a3c4f3',
		'#90dbf4',
		'#8eecf5',
		'#98f5e1',
		'#b9fbc0',
		'#cfbaf0',
		'#f1c0e8',
		'#ffcfd2',
		'#fde4cf',
		'#fbf8cc',
	];
	static INCIDENT_TYPES_WITH_SCORE = [ChartColors.SCORE, ...ChartColors.INCIDENT_TYPES];
	static RIDE_METRICS_DISTRIBUTION = ['#fef9c2', '#ffd6a7', '#ffc9c9'];
	static RIDE_METRICS_DISTRIBUTION_WITH_SCORE = [ChartColors.SCORE, '#ddd6ff', '#e9d4ff', ...ChartColors.RIDE_METRICS_DISTRIBUTION];
	static PROFILE_METRICS_DISTRIBUTION_WITH_SCORE = [ChartColors.SCORE, ...ChartColors.RIDE_METRICS_DISTRIBUTION];
}
