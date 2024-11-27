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
