import { Route } from '@angular/router';

export const REGION_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadComponent: () =>
					import("@simra/regions-browse").then((m) => m.RegionListViewPage)
			},
			{
				path: ':regionName',
				loadComponent: () =>
					import("@simra/regions-browse").then((m) => m.RegionDetailViewPage)
			},
			{
				path: '**',
				redirectTo: ''
			}
		]
	}
]
