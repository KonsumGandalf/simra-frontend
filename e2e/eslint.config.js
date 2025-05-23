const baseConfig = require("../eslint.base.config.cjs");
const playwright = require('eslint-plugin-playwright');

module.exports = [
    ...baseConfig,

	playwright.configs['flat/recommended'],
	{
		files: ['**/*.ts', '**/*.js'],
		// Override or add rules here
		rules: {},
	},
];
