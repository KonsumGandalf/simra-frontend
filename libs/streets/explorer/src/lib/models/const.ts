import { ISafetyMetrics } from '@simra/streets-common';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function safetyMetricsDisplayArray(
	safetyMetrics: ISafetyMetrics,
): { label: string; data: any }[] {
	return [
		{
			label: 'STREETS.EXPLORER.COMPONENTS.SAFE_METRICS_DIGIT_PANEL.LABEL.STREET_ID',
			data: safetyMetrics.planetOsmLineId,
		},
		{
			label: 'STREETS.EXPLORER.COMPONENTS.SAFE_METRICS_DIGIT_PANEL.LABEL.DANGEROUS_SCORE',
			data: safetyMetrics.dangerousScore,
		},
		{
			label: 'STREETS.EXPLORER.COMPONENTS.SAFE_METRICS_DIGIT_PANEL.LABEL.TOTAL_RIDES',
			data: safetyMetrics.numberOfRides,
		},
		{
			label: 'STREETS.EXPLORER.COMPONENTS.SAFE_METRICS_DIGIT_PANEL.LABEL.TOTAL_INCIDENTS',
			data: safetyMetrics.numberOfIncidents,
		},
		{
			label: 'STREETS.EXPLORER.COMPONENTS.SAFE_METRICS_DIGIT_PANEL.LABEL.TOTAL_SCARY_INCIDENT',
			data: safetyMetrics.numberOfScaryIncidents,
		},
		{
			label: 'STREETS.EXPLORER.COMPONENTS.SAFE_METRICS_DIGIT_PANEL.LABEL.CLOSE_OVERTAKING',
			data: safetyMetrics.numberOfClosePasses,
		},
		{
			label: 'STREETS.EXPLORER.COMPONENTS.SAFE_METRICS_DIGIT_PANEL.LABEL.PULL_IN_OUT',
			data: safetyMetrics.numberOfPullInOuts,
		},
		{
			label: 'STREETS.EXPLORER.COMPONENTS.SAFE_METRICS_DIGIT_PANEL.LABEL.NEAR_TURN_COLLISION',
			data: safetyMetrics.numberOfNearLeftRightHooks,
		},
		{
			label: 'STREETS.EXPLORER.COMPONENTS.SAFE_METRICS_DIGIT_PANEL.LABEL.HEAD_ON_APPROACHES',
			data: safetyMetrics.numberOfHeadOnApproaches,
		},
		{
			label: 'STREETS.EXPLORER.COMPONENTS.SAFE_METRICS_DIGIT_PANEL.LABEL.TAILGATING',
			data: safetyMetrics.numberOfTailgating,
		},
		{
			label: 'STREETS.EXPLORER.COMPONENTS.SAFE_METRICS_DIGIT_PANEL.LABEL.NEAR_DOORING',
			data: safetyMetrics.numberOfNearDoorings,
		},
		{
			label: 'STREETS.EXPLORER.COMPONENTS.SAFE_METRICS_DIGIT_PANEL.LABEL.OBSTACLE_EVASION',
			data: safetyMetrics.numberOfObstacleDodges,
		},
	];
}
