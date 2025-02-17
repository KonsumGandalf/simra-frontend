import { Route } from '@angular/router';

export const STREET_SHELL_ROUTES: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () =>
			import('@simra/streets-explorer').then((m) => m.StreetListViewPage),
	},
	{
		path: 'map',
		loadComponent: () =>
			import('@simra/streets-explorer').then((m) => m.StreetsExploringMapPage),
	},
	{
		path: '**',
		redirectTo: 'list',
	},
];
