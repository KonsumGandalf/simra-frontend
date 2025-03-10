import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
	{
		path: 'incidents',
		loadChildren: () => import('@simra/incidents-shell').then((m) => m.RIDE_INCIDENT_SHELL_ROUTES),
	},
	{
		path: 'rides',
		loadChildren: () => import('@simra/rides-shell').then((m) => m.RIDES_SHELL_ROUTES),
	},
	{
		path: 'streets',
		loadChildren: () => import('@simra/streets-shell').then((m) => m.STREET_SHELL_ROUTES),
	},
	{
		path: 'regions',
		loadChildren: () => import('@simra/regions-shell').then((m) => m.REGION_SHELL_ROUTES),
	},
	{
		path: 'not-found',
		loadComponent: () => import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage),
	},
	{
		path: '**',
		redirectTo: 'not-found',
	},
];
