import { Route } from '@angular/router';

export const RIDES_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				path: 'incident',
				loadChildren: () => import('@simra/rides-incident-shell').then((m) => m.RIDE_INCIDENT_SHELL_ROUTES),
			},
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
