import {
	ChangeDetectionStrategy,
	Component,
	computed, inject,
	input,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ISafetyMetrics } from '@simra/common-models';
import { scoreFormulaMarkdownSegment } from '@simra/common-utils';
import { isNumber } from 'lodash';
import { MarkdownComponent } from 'ngx-markdown';
import { Divider } from 'primeng/divider';
import { Skeleton } from 'primeng/skeleton';
import { Tooltip } from 'primeng/tooltip';
import { safetyMetricsDisplayArray } from '../../../models/const';

@Component({
	selector: 'm-safe-metrics-digit-panel',
	imports: [
		CommonModule,
		TranslatePipe,
		Divider,
		Skeleton,
		RouterLink,
		MarkdownComponent,
		Tooltip,
	],
	templateUrl: './safety-metrics-digit-panel.component.html',
	styleUrl: './safety-metrics-digit-panel.component.scss',
	host: {
		class: 'm-safe-metrics-digit-panel',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class SafetyMetricsDigitPanelComponent {
	protected readonly _activatedRoute = inject(ActivatedRoute);

	public readonly safetyMetrics = input<ISafetyMetrics | undefined>();

	safetyMetricsDisplay = computed(() => {
		const metrics = this.safetyMetrics();
		if (!metrics) {
			return undefined;
		}

		return safetyMetricsDisplayArray(metrics);
	});
	activatedUrl = toSignal(this._activatedRoute?.url);

	protected readonly _scoreMarkdown = computed(() => {
		const metrics = this.safetyMetrics();
		if (!metrics) {
			return undefined;
		}

		const { numberOfIncidents, numberOfScaryIncidents, numberOfRides, dangerousScore } = metrics;
		return scoreFormulaMarkdownSegment(numberOfIncidents, numberOfScaryIncidents, numberOfRides, dangerousScore);
	})

	protected readonly isNumber = isNumber;
}
