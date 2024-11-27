import { Route } from '@angular/router';

export const RIDE_incident_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				path: 'exploring-map',
				loadComponent: () =>
					import('@simra/rides-incident-map').then((m) => m.ExploringMapComponent),
			},
			{
				path: '**',
				redirectTo: 'exploring-map',
			},
		],
	},
];
