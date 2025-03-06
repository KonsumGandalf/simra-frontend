import {
	ChangeDetectionStrategy,
	Component,
	effect,
	ElementRef,
	inject, output,
	resource,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { APP_CONFIG } from '@simra/common-models';
import { StreetDetailViewFacade } from '@simra/streets-domain';
import { Viewer, ViewerOptions } from 'mapillary-js';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'a-mapillary',
	imports: [CommonModule],
	templateUrl: './mapillary.component.html',
	styleUrl: './mapillary.component.scss',
	host: {
		class: 'a-mapillary',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapillaryComponent {
	private readonly _activeRoute = inject(ActivatedRoute);
	private readonly _streetDetailViewFacade = inject(StreetDetailViewFacade);

	@ViewChild('mapillaryContainer')
	private readonly mapillaryContainer: ElementRef;

	hasMapillaryImage = output<boolean>();

	private readonly _accessToken = inject(APP_CONFIG).mapillaryAccessToken;
	private readonly _routeParams = toSignal(this._activeRoute.queryParams);

	private readonly _mapillaryImageId$ = resource({
		request: () => this._routeParams(),
		loader: async ({ request }) => {
			const { lat, lng } = request;
			return await firstValueFrom(this._streetDetailViewFacade.getIdOfNearestImage(lat, lng));
		},
	});

	constructor() {
		effect(() => {
			const imageId = this._mapillaryImageId$.value();
			if (!imageId) {
				return;
			}

			this.hasMapillaryImage.emit(true);
			new Viewer({
				accessToken: this._accessToken,
				container: this.mapillaryContainer.nativeElement,
				imageId: `${imageId}`,
			} as ViewerOptions);
		});
	}
}
