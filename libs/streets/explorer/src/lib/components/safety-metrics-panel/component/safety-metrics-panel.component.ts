import {
	ChangeDetectionStrategy,
	Component,
	computed, effect,
	inject, resource,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { SetSelectedSafetyMetrics, StreetDetailState, StreetDetailViewFacade } from '@simra/streets-domain';
import { drop, times } from 'lodash';
import { Card } from 'primeng/card';
import { Carousel } from 'primeng/carousel';
import { UIChart } from 'primeng/chart';
import { firstValueFrom } from 'rxjs';
import { safetyMetricsDisplayArray } from '../../../models/const';
import { SafetyMetricsService } from '../../../services/safety-metrics.service';
import { SafetyMetricsDigitPanelComponent } from '../../safety-metrics-digit-panel/component/safety-metrics-digit-panel.component';

@Component({
	selector: 'm-safety-metrics-panel',
	imports: [CommonModule, Carousel, SafetyMetricsDigitPanelComponent, UIChart, Card],
	templateUrl: './safety-metrics-panel.component.html',
	styleUrl: './safety-metrics-panel.component.scss',
	host: {
		class: 'm-safety-metrics-panel',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class SafetyMetricsPanelComponent {
	protected readonly _safetyMetricsService = inject(SafetyMetricsService);
	private readonly _streetDetailView = inject(StreetDetailViewFacade);
	protected readonly _store = inject(Store);

	readonly safetyMetrics$ = this._store.selectSignal(StreetDetailState.getSelectedSafetyMetrics);
	protected readonly _pieMetricsIncidentTypesOptions =
		this._safetyMetricsService.getPieMetricsIncidentTypesOptions();
	protected readonly _pieMetricsIncidentTypesData$ =
		this._safetyMetricsService.pieMetricsIncidentTypesData$;
	private readonly _street = this._store.selectSignal(StreetDetailState.getStreet);
	protected readonly _metricsIncidentTypes$ = resource({
		request: () => {
			return {
				street: this._street(),
				safetyMetrics: this.safetyMetrics$(),
			};
		},
		loader: async ({ request }) => {
			if (
				!request.safetyMetrics ||
				request.safetyMetrics.osmId != request.street?.id
			) {
				if (!request.street.id) {
					return;
				}
				await firstValueFrom(
					this._streetDetailView.fetchSafetyMetricsForStreet(request.street.id),
				);
			}

			return drop(safetyMetricsDisplayArray(request.safetyMetrics), 5).filter(
				(res) => res.data != 0,
			);
		},
	});

	protected readonly _barMetricsRideIncidentDistributionOptions =
		this._safetyMetricsService.getBarMetricsRideIncidentDistributionOptions();
	protected readonly _barMetricsRideIncidentDistributionData$ =
		this._safetyMetricsService.barMetricsRideIncidentDistributionData$;

	protected readonly _templatePages$ = computed(() => {
		let numberOfPages = 3;
		const safetyMetrics = this.safetyMetrics$();
		if (!safetyMetrics) {
			return times(1);
		}

		const safetyMetricsArray = safetyMetricsDisplayArray(safetyMetrics);
		const pieMetrics = drop(safetyMetricsArray, 5).filter((res) => res.data != 0);

		if (!this._pieMetricsIncidentTypesData$() || pieMetrics.length < 1) {
			numberOfPages -= 1;
		}
		return times(numberOfPages);
	});

	constructor() {
		effect(() => {
			this._store.dispatch(new SetSelectedSafetyMetrics(this.safetyMetrics$()));
		});
	}
}
