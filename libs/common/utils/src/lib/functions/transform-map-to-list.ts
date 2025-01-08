import { defaults, map } from 'lodash';

/**
 * Transforms a map to a list.
 *
 * @param mapValue - The map to transform.
 * @returns The list.
 *
 * @example
 * {
 * 			key1: { prop: 'value1' },
 * 			key2: { prop: 'value2' },
 * }
 * =>
 * [
 * 			{ key: 'key1', prop: 'value1' },
 * 			{ key: 'key2', prop: 'value2' },
 * ]
 */
export function transformMapToList<K extends keyof any, V>(mapValue: Record<K, V>): Array<{ key: string } & V> {
	return map(mapValue, (value, key) => defaults({ key }, value));
}
