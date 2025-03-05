import { Route } from '@angular/router';

export const RIDE_INCIDENT_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				path: 'map',
				loadComponent: () =>
					import('@simra/incidents-map').then((m) => m.IncidentsMapPage),
			},
			{
				path: '**',
				redirectTo: 'map',
			},
		],
	},
];
