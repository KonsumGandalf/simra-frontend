import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { APP_CONFIG, AppEnvironmentInterface } from '@simra/common-models';
import { MapFilterState } from '@simra/common-state';
import { StreetDetailState, StreetMapState } from '@simra/streets-domain';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { providePrimeNG } from 'primeng/config';
import { APP_ROUTES } from './app.routes';
import Aura from '@primeng/themes/aura';
import { backendUrlInterceptor } from './models/interceptors/backend-url.interceptor';
import { AppTranslationModule } from './translations/translation.module';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(APP_ROUTES, withComponentInputBinding(), withPreloading(QuicklinkStrategy)),
		{
			provide: APP_CONFIG,
			useValue: {
				apiUrl: process.env.SIMRA_API_URL,
			} as AppEnvironmentInterface,
		},
		provideHttpClient(withInterceptors([backendUrlInterceptor])),
		provideStore([StreetMapState, StreetDetailState, MapFilterState], {
			developmentMode: false,
		}),

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
