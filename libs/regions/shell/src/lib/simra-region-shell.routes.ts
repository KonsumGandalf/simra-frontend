import { Route } from '@angular/router';

export const SIMRA_REGION_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				path: '',
				loadComponent: () =>
					import("@simra/regions-browse").then((m) => m.SimraRegionListViewPage)
			},
			{
				path: ':regionName',
				loadComponent: () =>
					import("@simra/regions-browse").then((m) => m.SimraRegionDetailViewPage)
			},
			{
				path: '**',
				redirectTo: ''
			}
		]
	}
]
