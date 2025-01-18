import { transformMapToList } from './transform-map-to-list';

type TestType = {
	prop: string;
}

enum TestEnum {
	KEY1,
	KEY2,
}

describe('transformMapToList', () => {
	it('should transform a map with string keys to a list', () => {
		const mapValue = {
			key1: { prop: 'value1' },
			key2: { prop: 'value2' },
		};
		const result = transformMapToList<string, TestType>(mapValue);
		expect(result).toEqual([
			{ key: 'key1', prop: 'value1' },
			{ key: 'key2', prop: 'value2' },
		]);
	});

	it('should transform a map with number keys to a list', () => {
		const mapValue = {
			[1]: { prop: 'value1' },
			[2]: { prop: 'value2' },
		};
		const result = transformMapToList<number, TestType>(mapValue);
		expect(result).toEqual([
			{ key: "1", prop: 'value1' },
			{ key: "2", prop: 'value2' },
		]);
	});

	it('should transform a map with number keys to a list', () => {
		const mapValue = {
			[TestEnum.KEY1]: { prop: 'value1' },
			[TestEnum.KEY2]: { prop: 'value2' },
		};
		const result = transformMapToList<number, TestType>(mapValue);
		expect(result).toEqual([
			{ key: "0", prop: 'value1' },
			{ key: "1", prop: 'value2' },
		]);
	});

	it('should handle an empty map', () => {
		const mapValue = {};
		const result = transformMapToList(mapValue);
		expect(result).toEqual([]);
	});
});
