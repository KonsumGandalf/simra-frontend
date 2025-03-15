import { ChangeDetectionStrategy, Component, inject, model, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IPage } from '@simra/common-models';
import { RegionListViewFacade } from '@simra/regions-domain';
import { ISafetyMetricsRequest } from '@simra/streets-common';
import { TableModule } from 'primeng/table';
import { firstValueFrom } from 'rxjs';
import { ISafetyMetrics } from '@simra/streets-common';
import { BaseRegionListViewComponent } from '../../../components/base-region-list-view/component/base-region-list-view.component';

@Component({
	selector: 't-region-list-view',
	imports: [
		CommonModule,
		TableModule,
		BaseRegionListViewComponent,
	],
	templateUrl: './region-list-view.page.html',
	styleUrl: './region-list-view.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 't-region-list-view',
	},
})
export class RegionListViewPage {
	private readonly _facade = inject(RegionListViewFacade);

	protected readonly loading = signal<boolean>(false);
	protected readonly _regions$ = model<IPage<ISafetyMetrics>>();

	async onFilter(event: ISafetyMetricsRequest) {
		this.loading.set(true);
		this._regions$.set(await firstValueFrom(this._facade.getRegionListSafetyMetrics(event)));
		this.loading.set(false);
	}
}
