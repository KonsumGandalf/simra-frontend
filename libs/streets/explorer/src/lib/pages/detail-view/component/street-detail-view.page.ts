import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreetDetailViewFacade } from '@simra/streets-domain';
import { firstValueFrom } from 'rxjs';
import { IncidentListComponent } from '../../../components/incident-list/component/incident-list.component';
import { SafetyMetricsCardComponent } from '../../../components/safety-metrics-card/component/safety-metrics-card.component';
import { StreetInformationCardComponent } from '../../../components/street-information-card/component/street-information-card.component';

@Component({
	selector: 'p-street-detail-view',
	imports: [
		CommonModule,
		SafetyMetricsCardComponent,
		StreetInformationCardComponent,
		IncidentListComponent,
	],
	templateUrl: './street-detail-view.page.html',
	styleUrl: './street-detail-view.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'p-street-detail-view',
	},
})
export class StreetDetailViewPage   {
	private readonly _facade = inject(StreetDetailViewFacade);

	/**
	 * Automatically injected by activated route
	 */
	streetId = input<number>();

	constructor() {
		effect(() => {
			const streetId = this.streetId();
			if (!streetId) {
				return;
			}

			void firstValueFrom(this._facade.getAndSetStreet(streetId));
		});
	}
}
