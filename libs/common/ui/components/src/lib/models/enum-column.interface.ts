import { Column } from '@simra/common-models';
import { TTranslationMap } from '../translations/interfaces/translation-map.type';

export interface EnumColumn<T extends string | number | symbol = ''> extends Column {
	enum: Record<string, unknown>;
	translationMap: TTranslationMap<T>;
	maxSelectedDisplay?: number;
}
