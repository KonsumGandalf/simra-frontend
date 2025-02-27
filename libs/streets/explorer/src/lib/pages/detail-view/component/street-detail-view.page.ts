import { Component, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreetDetailViewFacade } from '@simra/streets-domain';
import { firstValueFrom } from 'rxjs';
import { SafetyMetricsCardComponent } from '../../../components/safety-metrics-card/component/safety-metrics-card.component';

@Component({
	selector: 'detail-view.page',
	imports: [CommonModule, SafetyMetricsCardComponent],
	templateUrl: './street-detail-view.page.html',
	styleUrl: './street-detail-view.page.scss',
})
export class StreetDetailViewPage {
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
