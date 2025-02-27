export const fakeSafetyMetricsService = {
	safetyMetrics$: () => ({
		planetOsmLineId: 21314,
		numberOfRides: 206,
		numberOfIncidents: 7,
		numberOfScaryIncidents: 3,
		dangerousScore: 0.03,
		numberOfClosePasses: 5,
		numberOfPullInOuts: 1,
		numberOfNearLeftRightHooks: 2,
		numberOfHeadOnApproaches: 4,
		numberOfTailgating: 2,
		numberOfNearDoorings: 0,
		numberOfObstacleDodges: 1,
	}),
	pieMetricsIncidentTypesData$: () => ({
		datasets: [{ data: [5, 2, 4, 3, 1] }],
		labels: ['Close Pass', 'Pull In/Out', 'Left/Right Hook', 'Head-On', 'Tailgating'],
	}),
	getPieMetricsIncidentTypesOptions: () => ({
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			title: { display: true, text: 'Fake Title' },
		},
	}),
	barMetricsRideIncidentDistributionData$: () => ({
		datasets: [{ data: [10, 5, 7] }],
		labels: ['Ride 1', 'Ride 2', 'Ride 3'],
	}),
	getBarMetricsRideIncidentDistributionOptions: () => ({
		responsive: true,
		aspectRatio: 0.6,
		plugins: {
			title: { display: true, text: 'Fake Bar Chart' },
			legend: { display: false },
		},
		scales: {
			y: { beginAtZero: true },
			right: { beginAtZero: true, position: 'right' },
		},
	}),
}
