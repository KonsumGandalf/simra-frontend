import { Route } from '@angular/router';
import { numberMatcher } from '@simra/common-utils';

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
			import('@simra/streets-explorer').then((m) => m.StreetsMapPage),
	},
	{
		matcher: numberMatcher,
		loadComponent: () =>
			import('@simra/streets-explorer').then((m) => m.StreetDetailViewPage),
	},
	{
		path: '**',
		redirectTo: '',
	},
];
