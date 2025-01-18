import { EDangerousColors } from '@simra/common-models';

export const DangerousColorToScoreRange: Partial<Record<EDangerousColors, number[]>> = {
	[EDangerousColors.RED_500]: [0.5],
	[EDangerousColors.ORANGE_500]: [0.25, 0.5],
	[EDangerousColors.AMBER_500]: [0.1, 0.25],
	[EDangerousColors.LIME_500]: [0.04, 0.1],
	[EDangerousColors.GREEN_500]: [0, 0.04],
}
