import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
	stories: [
		'../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
		{
			directory: '../libs/common/ui/components/src/lib/atoms',
			titlePrefix: 'Atoms/'
		},
		{
			directory: '../libs/common/ui/components/src/lib/molecules',
			titlePrefix: 'Molecules/'
		},
		{
			directory: '../libs/common/ui/components/src/lib/templates',
			titlePrefix: 'Templates/'
		},
		{
			directory: '../libs/streets/explorer',
			titlePrefix: 'Streets Explorer/'
		},
		{
			directory: '../libs/incidents/ui',
			titlePrefix: 'Incidents'
		}
	],
	staticDirs: [
		// i18n
		{
			from: '../libs/common/ui/components/assets/i18n',
			to: '/assets/i18n/common/ui/components'
		},
		{
			from: '../libs/streets/explorer/assets/i18n',
			to: '/assets/i18n/streets/explorer'
		},
		{
			from: '../libs/incidents/ui/assets/i18n',
			to: '/assets/i18n/incidents/ui'
		},
		// icons
		{
			from: '../libs/incidents/ui/assets/icons',
			to: 'assets/icons/incidents/ui'
		}
	],
	addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-styling-webpack'
    ],
	framework: {
		name: '@storybook/angular',
		options: {},
	},
	core: {
		builder: {
			name: 'webpack5',
			options: {
				lazyCompilation: true,
				fsCache: true,
			}
		}
	},
	docs: {
		defaultName: 'Docs',
	}
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
