import { TTranslationMap } from '@simra/common-components';
import { ECyclewayType } from '@simra/common-models';

export const CYCLEWAY_LANES_TO_TRANSLATION: TTranslationMap<ECyclewayType> = {
	[ECyclewayType.ADVISORY]: {
		label: 'STREETS.EXPLORER.GENERAL.ENTITY_ATTRIBUTES.CYCLEWAY_TYPES.LABEL.ADVISORY',
	},
	[ECyclewayType.EXCLUSIVE]: {
		label: 'STREETS.EXPLORER.GENERAL.ENTITY_ATTRIBUTES.CYCLEWAY_TYPES.LABEL.EXCLUSIVE',
	},
	[ECyclewayType.PICTOGRAM]: {
		label: 'STREETS.EXPLORER.GENERAL.ENTITY_ATTRIBUTES.CYCLEWAY_TYPES.LABEL.PICTOGRAM',
	},
	[ECyclewayType.NO]: {
		label: 'STREETS.EXPLORER.GENERAL.ENTITY_ATTRIBUTES.CYCLEWAY_TYPES.LABEL.NO',
	},
}
