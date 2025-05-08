export function getAgeSortOrder(groupName: string): number {
	const order = [
		'BEFORE_1950',
		'BETWEEN_1950_AND_1954',
		'BETWEEN_1955_AND_1959',
		'BETWEEN_1960_AND_1964',
		'BETWEEN_1965_AND_1969',
		'BETWEEN_1970_AND_1974',
		'BETWEEN_1975_AND_1979',
		'BETWEEN_1980_AND_1984',
		'BETWEEN_1985_AND_1989',
		'BETWEEN_1990_AND_1994',
		'BETWEEN_1995_AND_1999',
		'BETWEEN_2000_AND_2004',
		'AFTER_2004',
		'NOT_CHOSEN'
	];

	return order.indexOf(groupName) !== -1 ? order.indexOf(groupName) : 999;
}

export function getExperienceSortOrder(groupName: string): number {
	const order = [
		'BEGINNER',
		'INTERMEDIATE',
		'ADVANCED',
		'EXPERT',
		'NOT_CHOSEN'
	];

	return order.indexOf(groupName) !== -1 ? order.indexOf(groupName) : 999;
}
