import { Route } from '@angular/router';

export const RIDES_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				path: 'exploring-map',
				loadComponent: () =>
					import('@simra/rides-map').then((m) => m.RidesExploringMapPage),
			},
			{
				path: '**',
				redirectTo: 'exploring-map',
			}
		]
	}
];
