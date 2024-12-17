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
					prefix: ['simra', 'app'],
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: ['simra', 'app'],
					style: 'kebab-case',
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
	{
		files: ['**/*.ts'],
		rules: {
			'@angular-eslint/prefer-standalone': 'warn',
			"@typescript-eslint/no-unused-vars": "error",
		},
	},
];
