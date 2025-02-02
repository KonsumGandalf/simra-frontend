import { Route } from '@angular/router';

export const RIDE_INCIDENT_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				path: 'exploring-map',
				loadComponent: () =>
					import('@simra/incidents-map').then((m) => m.IncidentExploringMapPage),
			},
			{
				path: '**',
				redirectTo: 'exploring-map',
			},
		],
	},
];
