import { Route } from '@angular/router';

export const STREET_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				path: 'exploring-map',
				loadComponent: () =>
					import('@simra/streets-map').then((m) => m.StreetsExploringMapPage),
			},
			{
				path: '**',
				redirectTo: 'exploring-map',
			}
		]
	}
];
