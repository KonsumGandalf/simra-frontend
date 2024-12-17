import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject, model, ModelSignal,
	ViewEncapsulation,
} from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { asyncComputed } from '@simra/common-utils';
import { StreetsExploringMapFacade } from '@simra/streets-domain';
import { firstValueFrom } from 'rxjs';
import { MapPositionInterface } from '@simra/common-models';
import { MapComponent } from '@simra/common-components';

@Component({
	selector: 'simra-streets-exploring-map',
	imports: [CommonModule, LeafletModule, MapComponent],
	templateUrl: './exploring-map.page.html',
	styleUrl: './exploring-map.page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	host: {
		class: 'o-simra-exploring-map',
	},
})
export class ExploringMapPage {
	private readonly _exploringMapFacade = inject(StreetsExploringMapFacade);

	readonly _lp: ModelSignal<MapPositionInterface> = model({
		lat: 52.522,
		lng: 13.413,
		zoom: 14,
	});

	protected readonly streets$ = asyncComputed(() => {
		const lp = this._lp() || {
			lat: 52.522,
			lng: 13.413,
			zoom: 14,
		};
		return firstValueFrom(this._exploringMapFacade.getStreetInformation(lp));
	});
}


