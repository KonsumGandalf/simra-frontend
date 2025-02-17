import { TranslationInterface } from './translation.interface';

export type TTranslationMap<T extends string | number | symbol = '', E = unknown> = Record<T, TranslationInterface & E>;
