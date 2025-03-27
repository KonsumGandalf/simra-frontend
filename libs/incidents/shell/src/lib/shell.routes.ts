import { Route } from '@angular/router';

export const RIDE_INCIDENT_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: () =>
					import('@simra/incidents-map').then((m) => m.IncidentsMapPage),
			},
			{
				path: '**',
				redirectTo: '',
			},
		],
	},
];
