import { TTranslationMap } from '@simra/common-components';

export interface ITagCard {
	title: string;
	children: CardRow[];
	translationMap: TTranslationMap<string>;
}

interface CardRow {
	title: string;
	children: TagCategory[];
}

interface TagCategory {
	value: string;
	link?: string;
	title: string;
}
