import { Route } from '@angular/router';

export const STREET_SHELL_ROUTES: Route[] = [
	{
		path: '',
		redirectTo: 'list',
		pathMatch: 'full',
	},
	{
		path: 'map',
		loadComponent: () =>
			import('@simra/streets-map').then((m) => m.StreetsExploringMapPage),
	},
	{
		path: 'list',
		loadComponent: () =>
			import('@simra/streets-map').then((m) => m.StreetListViewPage),
	},
	{
		path: '**',
		redirectTo: 'list',
	},
];
