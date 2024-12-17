const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../../eslint.base.config.js');

module.exports = [
	...baseConfig,
	...nx.configs['flat/angular'],
	...nx.configs['flat/angular-template'],
	{
		files: ['**/*.ts'],
		rules: {
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					/**
					 * Reference to atomic design
					 * https://atomicdesign.bradfrost.com/chapter-2/
					 *
					 * A - Atoms
					 * M - Molecules
					 * O - Organisms
					 * T - Templates
					 */
					prefix: ['a', 'm', 'o', 't'],
					style: 'kebab-case',
				},
			],
		},
	},
	{
		files: ['**/*.html'],
		// Override or add rules here
		rules: {},
	},
];
