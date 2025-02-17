import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { SafetyMetricsDto } from '@simra/streets-common';
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
	safetyMetrics = input<SafetyMetricsDto | undefined>();
	safetyMetricsDisplay = computed(() => {
		const metrics = this.safetyMetrics();
		if (!metrics) {
			return;
		}

		return safetyMetricsDisplayArray(metrics)
	})
}
