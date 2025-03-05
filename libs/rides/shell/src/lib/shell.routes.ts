import { Route } from '@angular/router';

export const RIDES_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				path: 'map',
				loadComponent: () =>
					import('@simra/rides-map').then((m) => m.RidesMapPage),
			},
			{
				path: '**',
				redirectTo: 'map',
			}
		]
	}
];
