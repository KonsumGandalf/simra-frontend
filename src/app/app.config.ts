import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { APP_CONFIG, AppEnvironmentInterface } from '@simra/common-models';
import { backendUrlInterceptor } from '../models/interceptors/backend-url.interceptor';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    {
      provide: APP_CONFIG,
      useValue: {
        apiUrl: process.env.SIMRA_API_URL,
      } as AppEnvironmentInterface },
    provideHttpClient(withInterceptors([ backendUrlInterceptor ])),
  ],
};
