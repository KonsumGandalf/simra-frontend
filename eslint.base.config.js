const nx = require('@nx/eslint-plugin');

module.exports = [
	...nx.configs['flat/base'],
	...nx.configs['flat/typescript'],
	...nx.configs['flat/javascript'],
	{
		ignores: ['**/dist'],
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		rules: {
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
					depConstraints: [
						{
							sourceTag: '*',
							onlyDependOnLibsWithTags: ['*'],
						},
						{
							sourceTag: 'type:master-feature',
							onlyDependOnLibsWithTags: [
								'type:feature',
								'type:util-feature',
								'type:util',
								'type:common-model',
							],
						},
						{
							sourceTag: 'type:feature',
							onlyDependOnLibsWithTags: [
								'type:feature',
								'type:util-feature',
								'type:util',
								'type:common-model',
								'type:ui',
							],
						},
						{
							sourceTag: 'type:util-feature',
							onlyDependOnLibsWithTags: [
								'type:util',
								'type:util-feature',
								'type:common-model',
							],
						},
						{
							sourceTag: 'type:util',
							onlyDependOnLibsWithTags: ['type:util', 'type:common-model'],
						},
						{
							sourceTag: 'type:common-model',
							onlyDependOnLibsWithTags: ['type:common-model'],
						},
						{
							sourceTag: 'type:ui',
							onlyDependOnLibsWithTags: [
								'type:ui',
								'type:atoms-ui',
								'type:molecules-ui',
								'type:organisms-ui',
							],
						},
						{
							sourceTag: 'type:atoms-ui',
							onlyDependOnLibsWithTags: ['type:ui'],
						},
						{
							sourceTag: 'type:molecules-ui',
							onlyDependOnLibsWithTags: [
								'type:ui',
								'type:atoms-ui',
								'type:molecules-ui',
							],
						},
						{
							sourceTag: 'type:organisms-ui',
							onlyDependOnLibsWithTags: [
								'type:ui',
								'type:atoms-ui',
								'type:molecules-ui',
								'type:organisms-ui',
							],
						},
						{
							sourceTag: 'type:page-ui',
							onlyDependOnLibsWithTags: [
								'type:ui',
								'type:atoms-ui',
								'type:molecules-ui',
								'type:organisms-ui',
							],
						},
						{
							sourceTag: 'domain:shared',
							onlyDependOnLibsWithTags: ['domain:shared'],
						},
						{
							sourceTag: 'domain:rides',
							onlyDependOnLibsWithTags: ['domain:shared', 'domain:rides'],
						},
						{
							sourceTag: 'domain:incident',
							onlyDependOnLibsWithTags: ['domain:shared', 'domain:incident'],
						}
					],
				},
			],
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		// Override or add rules here
		rules: {},
	},
	{
		files: ['*.scss'],
		extends: ['stylelint'],
		rules: {},
	},
	{
		files: ['*.ts', '*.tsx'],
		extends: [
			'plugin:@nx/typescript',
			'plugin:@typescript-eslint/eslint-recommended',
			'plugin:@typescript-eslint/recommended',
		],
		plugins: ['simple-import-sort', 'prettier'],
		rules: {
			'simple-import-sort/imports': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'prettier/prettier': 'error',
		},
	},
];
