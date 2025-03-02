import { TTranslationMap } from '@simra/common-components';
import { EBikeType } from '@simra/incidents-models';

export const BIKE_TYPE_TO_TRANSLATION: TTranslationMap<EBikeType> = {
	[EBikeType.NOT_CHOSEN]: {
		label: 'INCIDENTS.UI.BIKE_TYPES.NOT_CHOSEN'
	},
	[EBikeType.MOUNTAIN_BIKE]: {
		label: 'INCIDENTS.UI.BIKE_TYPES.MOUNTAIN_BIKE'
	},
	[EBikeType.CITY_TREKKING_BIKE]: {
		label: 'INCIDENTS.UI.BIKE_TYPES.CITY_TREKKING_BIKE'
	},
	[EBikeType.ROAD_RACING_BIKE]: {
		label: 'INCIDENTS.UI.BIKE_TYPES.ROAD_RACING_BIKE'
	},
	[EBikeType.E_BIKE]: {
		label: 'INCIDENTS.UI.BIKE_TYPES.E_BIKE'
	},
	[EBikeType.RECUMBENT_BICYCLE]: {
		label: 'INCIDENTS.UI.BIKE_TYPES.RECUMBENT_BICYCLE'
	},
	[EBikeType.FREIGHT_BICYCLE]: {
		label: 'INCIDENTS.UI.BIKE_TYPES.FREIGHT_BICYCLE'
	},
	[EBikeType.TANDEM_BICYCLE]: {
		label: 'INCIDENTS.UI.BIKE_TYPES.TANDEM_BICYCLE'
	},
	[EBikeType.OTHER]: {
		label: 'INCIDENTS.UI.BIKE_TYPES.OTHER'
	},
};
