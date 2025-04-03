import { ChangeDetectionStrategy, Component, effect, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
	BERLIN_POSITION,
	HANNOVER_POSITION,
	HEIDELBERG_POSITION, MUNICH_POSITION,
	NUREMBERG_POSITION,
	RUHRGEBIET_POSITION,
	WALLDORF_POSITION, WUPPERTAL_POSITION,
} from '@simra/common-components';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Badge } from 'primeng/badge';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { Ripple } from 'primeng/ripple';
import { TieredMenu } from 'primeng/tieredmenu';
import { environment } from '../../../../environments/environment';
import { PrefetchService } from '../../../services/prefetch.service';

@Component({
	selector: 'menu-bar',
	imports: [
		CommonModule,
		Menubar,
		Badge,
		Ripple,
		TranslatePipe,
		Button,
		TieredMenu,
		PrimeTemplate,
		RouterLink,
		Breadcrumb,
	],
	templateUrl: './menu-bar.component.html',
	styleUrl: './menu-bar.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'menu-bar',
	},
})
export class MenuBarComponent {
	private readonly _translateService = inject(TranslateService);
	private readonly _prefetchService = inject(PrefetchService);
	private readonly _router = inject(Router);

	private readonly _prodItems: MenuItem[] = [
		{
			label: 'APP.COMPONENTS.MENU_BAR.ITEMS.HOME',
			icon: 'ph-bold ph-house-simple',
			routerLink: '/',
		},
		{
			label: 'APP.COMPONENTS.MENU_BAR.ITEMS.REGIONS',
			icon: 'ph-bold ph-map-pin-simple-area',
			items: [
				{
					label: 'APP.COMPONENTS.MENU_BAR.ITEMS.ADMINISTRATIVE_REGIONS',
					icon: 'ph-bold ph-city',
					routerLink: '/administrative-districts',
				},
				{
					label: 'APP.COMPONENTS.MENU_BAR.ITEMS.SIMRA_REGIONS',
					icon: 'ph-bold ph-globe-stand',
					routerLink: '/simra-regions',
				},
			],
		},
		{
			label: 'APP.COMPONENTS.MENU_BAR.ITEMS.STREETS',
			icon: 'ph-bold ph-road-horizon',
			items: [
				{
					label: 'APP.COMPONENTS.MENU_BAR.ITEMS.LIST',
					icon: 'ph-bold ph-table',
					routerLink: '/streets',
				},
				{
					label: 'APP.COMPONENTS.MENU_BAR.ITEMS.MAP',
					icon: 'ph-bold ph-map-trifold',
					items: [
						{
							label: 'Berlin',
							queryParams: BERLIN_POSITION,
						},
						{
							label: 'Nürnberg',
							queryParams: NUREMBERG_POSITION,
						},
						{
							label: 'Hannover',
							queryParams: HANNOVER_POSITION,
						},
						{
							label: 'Walldorf',
							queryParams: WALLDORF_POSITION,
						},
						{
							label: 'Heidelberg',
							queryParams: HEIDELBERG_POSITION,
						},
						{
							label: 'Ruhrgebiet',
							queryParams: RUHRGEBIET_POSITION,
						},
						{
							label: 'Wuppertal',
							queryParams: WUPPERTAL_POSITION,
						},
						{
							label: 'Munich',
							queryParams: MUNICH_POSITION,
						},
					].map((item) => {
						return {
							...item,
							routerLink: '/streets/map',
							prefetch: async () => await this._prefetchService.prefetchStreetGrid(item.queryParams),
						}
					})
				},
			],
		},
		{
			label: 'APP.COMPONENTS.MENU_BAR.ITEMS.INCIDENTS',
			icon: 'ph-bold ph-warning-diamond',
			routerLink: '/incidents',
			prefetch: async () => await this._prefetchService.prefetchIncidents(),
		}
	];
	private readonly _devItems: MenuItem[] = [
		{
			label: 'APP.COMPONENTS.MENU_BAR.ITEMS.RIDES',
			icon: 'ph-bold ph-person-simple-bike',
			routerLink: '/rides',
		},
	];
	protected readonly _items = [...(environment.production ? []: this._devItems), ...this._prodItems];

	protected readonly _settings: MenuItem[] = [
		{
			label: 'APP.COMPONENTS.MENU_BAR.SETTINGS.LANGUAGE.TITLE',
			icon: 'ph-bold ph-translate',
			items: [
				{
					icon: 'fi fi-gb',
					label: 'APP.COMPONENTS.MENU_BAR.SETTINGS.LANGUAGE.EN',
					command: () => this._translateService.use('en'),
				},
				{
					icon: 'fi fi-de',
					label: 'APP.COMPONENTS.MENU_BAR.SETTINGS.LANGUAGE.DE',
					command: () => this._translateService.use('de'),
				},
			],
		},
		/* If you want to add a theme switcher, you can use the following code:
		{
			label: 'APP.COMPONENTS.MENU_BAR.SETTINGS.THEME.TITLE',
			icon: 'ph-bold ph-moon-stars',
			items: [
				{
					label: 'APP.COMPONENTS.MENU_BAR.SETTINGS.THEME.DARK',
					command: () => {
						document.body.classList.add('dark');
					},
				},
				{
					label: 'APP.COMPONENTS.MENU_BAR.SETTINGS.THEME.LIGHT',
					command: () => {
						document.body.classList.remove('dark');
					},
				},
			],
		},
		*/
	];

	private readonly _routerEvents = toSignal(this._router.events);
	protected _breadcrumbItems$ = signal<MenuItem[]>([]);

	protected readonly _home: MenuItem = {
		routerLink: '/',
		icon: 'ph-bold ph-house-simple',
	};

	constructor() {
		effect(() => {
			const event = this._routerEvents();
			if (!(event instanceof NavigationEnd)) {
				return;
			}

			const breadcrumbs: MenuItem[] = [];
			let accumulatedUrl = '';

			const cleanedUrl = event.url.split('?')[0].split('#')[0];
			const pathSegments = cleanedUrl.split('/').filter((segment) => segment !== '');

			for (const segment of pathSegments) {
				accumulatedUrl += `/${segment}`;
				const capitalizedSegment = decodeURIComponent(this.capitalizeAfterHyphen(segment[0].toUpperCase() + segment.slice(1)));
				breadcrumbs.push({ label: capitalizedSegment, routerLink: accumulatedUrl });
			}

			this._breadcrumbItems$.set(breadcrumbs);
		});
	}

	private capitalizeAfterHyphen (input: string): string {
		return input
			.split('-')
			.map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
			.join('-');
	};
}
