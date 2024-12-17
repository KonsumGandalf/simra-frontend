import { Route } from '@angular/router';

export const STREET_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				path: 'exploring-map',
				loadComponent: () =>
					import('@simra/streets-map').then((m) => m.ExploringMapPage),
			},
			{
				path: '**',
				redirectTo: 'exploring-map',
			}
		]
	}
];
