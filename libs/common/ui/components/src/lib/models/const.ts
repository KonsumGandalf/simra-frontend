
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ISafetyMetrics } from '@simra/common-models';

export function safetyMetricsDisplayArray<T extends ISafetyMetrics>(
	safetyMetrics: T,
): { label: string; data: any, link?: string, tooltip?: string }[] {
	const specificAttributes = [];

	if ('osmId' in safetyMetrics) {
		specificAttributes.push(
			{
				label: 'COMPONENTS.GENERAL.TABLE.HEADER.COLUMNS.OSM_ID',
				data: safetyMetrics.osmId,
				link: `/streets/${safetyMetrics.osmId}`,
			},
			{
				label: 'STREETS.EXPLORER.GENERAL.TABLE.HEADER.COLUMNS.SCORE',
				data: safetyMetrics.dangerousScore,
				tooltip: 'STREETS.EXPLORER.GENERAL.TABLE.HEADER.COLUMNS.SCORE_FORMULA'
			},
		);
	}
	if ('name' in safetyMetrics) {
		specificAttributes.push(
			{
				label: 'COMPONENTS.GENERAL.TABLE.HEADER.COLUMNS.NAME',
				data: safetyMetrics.name,
				link: `/administrative-districts/${safetyMetrics.name}`,
			},
			{
				label: 'REGIONS.BROWSE.GENERAL.ENTITY_ATTRIBUTES.REGION.SCORE.LABEL',
				data: safetyMetrics.dangerousScore,
				tooltip: 'REGIONS.BROWSE.GENERAL.ENTITY_ATTRIBUTES.REGION.SCORE.FORMULA'
			},
		);
	}

	const generalAttributes = [
		{
			label: 'STREETS.EXPLORER.GENERAL.TABLE.HEADER.COLUMNS.RIDES',
			data: safetyMetrics.numberOfRides,
		},
		{
			label: 'STREETS.EXPLORER.GENERAL.TABLE.HEADER.COLUMNS.INCIDENTS',
			data: safetyMetrics.numberOfIncidents,
		},
		{
			label: 'STREETS.EXPLORER.GENERAL.TABLE.HEADER.COLUMNS.SCARY_INCIDENTS',
			data: safetyMetrics.numberOfScaryIncidents,
		},
		{
			label: 'INCIDENTS.UI.INCIDENT_TYPES.CLOSE_PASS',
			data: safetyMetrics.numberOfClosePasses,
		},
		{
			label: 'INCIDENTS.UI.INCIDENT_TYPES.PULLING_IN_OUT',
			data: safetyMetrics.numberOfPullInOuts,
		},
		{
			label: 'INCIDENTS.UI.INCIDENT_TYPES.NEAR_LEFT_RIGHT_HOOK',
			data: safetyMetrics.numberOfNearLeftRightHooks,
		},
		{
			label: 'INCIDENTS.UI.INCIDENT_TYPES.HEAD_ON_APPROACH',
			data: safetyMetrics.numberOfHeadOnApproaches,
		},
		{
			label: 'INCIDENTS.UI.INCIDENT_TYPES.TAILGATING',
			data: safetyMetrics.numberOfTailgating,
		},
		{
			label: 'INCIDENTS.UI.INCIDENT_TYPES.NEAR_DOORING',
			data: safetyMetrics.numberOfNearDoorings,
		},
		{
			label: 'INCIDENTS.UI.INCIDENT_TYPES.DODGING_OBSTACLE',
			data: safetyMetrics.numberOfObstacleDodges,
		},
	];

	return [...specificAttributes, ...generalAttributes];
}
