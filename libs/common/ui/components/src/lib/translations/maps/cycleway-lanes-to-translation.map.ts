import { TTranslationMap } from '../interfaces/translation-map.type';
import { ECyclewayType } from '@simra/common-models';

export const CYCLEWAY_LANES_TO_TRANSLATION: TTranslationMap<ECyclewayType> = {
	[ECyclewayType.ADVISORY]: {
		label: 'COMPONENTS.GENERAL.ENTITY_ATTRIBUTES.CYCLEWAY_TYPES.LABEL.ADVISORY',
	},
	[ECyclewayType.EXCLUSIVE]: {
		label: 'COMPONENTS.GENERAL.ENTITY_ATTRIBUTES.CYCLEWAY_TYPES.LABEL.EXCLUSIVE',
	},
	[ECyclewayType.PICTOGRAM]: {
		label: 'COMPONENTS.GENERAL.ENTITY_ATTRIBUTES.CYCLEWAY_TYPES.LABEL.PICTOGRAM',
	},
}
