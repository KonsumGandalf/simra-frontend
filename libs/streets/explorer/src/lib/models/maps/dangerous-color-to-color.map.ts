import { EDangerousColors } from '@simra/common-models';

export const DANGEROUS_SCORE_TO_COLOR_MAP: Record<number, EDangerousColors> = {
	0.5: EDangerousColors.RED_500,
	0.25: EDangerousColors.ORANGE_500,
	0.1: EDangerousColors.AMBER_500,
	0.04: EDangerousColors.LIME_500,
	0: EDangerousColors.GREEN_500
};
