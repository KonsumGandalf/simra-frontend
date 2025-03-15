import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ISafetyMetrics } from '@simra/common-models';
import { isNumber } from 'lodash';
import { Divider } from 'primeng/divider';
import { Skeleton } from 'primeng/skeleton';
import { safetyMetricsDisplayArray } from '../../../models/const';

@Component({
	selector: 'm-safe-metrics-digit-panel',
	imports: [CommonModule, TranslatePipe, Divider, Skeleton],
	templateUrl: './safety-metrics-digit-panel.component.html',
	styleUrl: './safety-metrics-digit-panel.component.scss',
	host: {
		class: 'm-safe-metrics-digit-panel',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class SafetyMetricsDigitPanelComponent {
	safetyMetrics = input<ISafetyMetrics | undefined>();
	safetyMetricsDisplay = computed(() => {
		const metrics = this.safetyMetrics();
		if (!metrics) {
			return undefined;
		}

		return safetyMetricsDisplayArray(metrics);
	});
	protected readonly isNumber = isNumber;
}
