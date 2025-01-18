const baseConfig = require("../../../../eslint.base.config.cjs");
const nx = require('@nx/eslint-plugin');

module.exports = [
    ...baseConfig,
	...nx.configs['flat/angular'],
	...nx.configs['flat/angular-template'],
	{
		files: ['**/*.html'],
		// Override or add rules here
		rules: {},
	},
	{
		files: ['**/*.ts'],
		rules: {
			'@angular-eslint/prefer-standalone': 'off',
		},
	},
];
