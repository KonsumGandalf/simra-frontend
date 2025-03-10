import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RegionDetailViewFacade } from '@simra/regions-domain';

@Component({
	selector: 'p-region-detail-view',
	imports: [CommonModule],
	templateUrl: './region-detail-view.page.html',
	styleUrl: './region-detail-view.page.scss',
	host: {
		class: 'p-region-detail-view',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegionDetailViewPage {
	private readonly _facade = inject(RegionDetailViewFacade);

	protected readonly _safetyMetrics = toSignal(this._facade.getRegionSafetyMetrics('Berlin'));
}
