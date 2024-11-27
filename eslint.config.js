const baseConfig = require('./eslint.base.config.js');
const nx = require('@nx/eslint-plugin');

module.exports = [
	...baseConfig,
	{
		ignores: ['**/dist', 'node_modules', 'libs/shared/common/styles/*'],
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		// Override or add rules here
		rules: {},
	},
	...nx.configs['flat/angular'],
	...nx.configs['flat/angular-template'],
	{
		files: ['**/*.ts'],
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
			'@angular-eslint/component-class-suffix': [
				'error',
				{
					suffixes: ['Component', 'Page'],
				},
			],
		},
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
	{
		files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
		rules: {
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: [],
					depConstraints: [
						{
							sourceTag: 'type:app',
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
						},
					],
				},
			],
		},
	},
	{
		files: ['*.scss'],
		extends: ['stylelint'],
		rules: {},
	},
	{
		files: ['**/*.html'],
		rules: {},
	},
	{
		files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
		env: {
			jest: true,
		},
		rules: {},
	},
];
