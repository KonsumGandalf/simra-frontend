export function getEnumOrder<T extends Record<string, string | number>>(enumType: T, value: T[keyof T]): number {
	  return Object.keys(enumType).indexOf(value.toString());
}
