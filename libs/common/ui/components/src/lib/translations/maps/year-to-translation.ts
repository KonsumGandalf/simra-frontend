import { TTranslationMap } from '../interfaces/translation-map.type';
import { EYear } from '@simra/common-models';

export const YEAR_TO_TRANSLATION: Partial<TTranslationMap<EYear>> = {
	[EYear.ALL]: {
		label: 'COMPONENTS.GENERAL.ENTITY_ATTRIBUTES.YEAR.LABEL.ALL',
	}
};

Object.values(EYear).forEach((year) => {
	if (!(year in YEAR_TO_TRANSLATION)) {
		YEAR_TO_TRANSLATION[year as EYear] = {
			label: `${year}`
		};
	}
});

