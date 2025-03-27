import { Route } from '@angular/router';

export const RIDES_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: () =>
					import('@simra/rides-map').then((m) => m.RidesMapPage),
			},
			{
				path: '**',
				redirectTo: '',
			}
		]
	}
];
