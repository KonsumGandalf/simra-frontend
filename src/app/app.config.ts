import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { APP_CONFIG, AppEnvironmentInterface } from '@simra/common-models';
import { providePrimeNG } from 'primeng/config';
import { APP_ROUTES } from './app.routes';
import Aura from '@primeng/themes/aura';
import { backendUrlInterceptor } from './models/interceptors/backend-url.interceptor';
import { AppTranslationModule } from './translations/translation.module';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(APP_ROUTES, withComponentInputBinding()),
		{
			provide: APP_CONFIG,
			useValue: {
				apiUrl: process.env.SIMRA_API_URL,
			} as AppEnvironmentInterface,
		},
		provideHttpClient(withInterceptors([backendUrlInterceptor])),

		/**
		 * UI dependencies
		 */
		provideAnimationsAsync(),
		providePrimeNG({
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: '.dark',
				},
			},
		}),

		/**
		 * Language dependencies
		 */
		importProvidersFrom([AppTranslationModule])
	],
};
