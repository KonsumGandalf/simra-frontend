import { APP_INITIALIZER } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Preview } from '@storybook/angular';
import Aura from '@primeng/themes/aura';
import { PrimeNG } from 'primeng/config';
import { setCompodocJson } from '@storybook/addon-docs/angular';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import docJson from './documentation.json';
setCompodocJson(docJson);

function provideTheme(config: PrimeNG) {
	return () => {
		config.theme.set({
			preset: Aura,
		});
	};
}

const preview: Preview = {
	decorators: [
		applicationConfig({
			providers: [
				provideAnimations(),
				{
					provide: APP_INITIALIZER,
					useFactory: provideTheme,
					deps: [ PrimeNG ],
					multi: true,
				},
			],
		}),
	],
	tags: ['autodocs'],
	parameters: {
		docs: {
			story: {
				inline: true
			},
		},
		controls: {
			expanded: true
		}
	}
};



export default preview;
