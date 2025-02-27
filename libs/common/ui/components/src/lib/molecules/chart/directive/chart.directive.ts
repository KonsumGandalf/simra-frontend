import { Directive, inject, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UIChart } from 'primeng/chart';


@Directive({
	selector: 'p-chart',
})
export class ChartDirective {
	private readonly _translationService = inject(TranslateService);
	private readonly _elementRef = inject(UIChart);

	@Input() plugins: any[] = [];
	@Input() data: any;
	@Input() type: string;

	private readonly _primaryTextColor = getComputedStyle(document.documentElement).getPropertyValue('--p-text-color')
	private readonly _backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--p-surface-100')

	constructor() {
		const chartPlugins = this._elementRef.plugins || [];
		if (!chartPlugins.includes(this.noDataPlugin)) {
			this._elementRef.plugins= [...chartPlugins, this.noDataPlugin];
		}
	}

	private noDataPlugin = {
		id: 'noData',
		afterDatasetsDraw: (chart: any) => {
			if (chart.data.datasets.every((dataset: any) =>
				dataset.data.every((value: number) => value === 0)
			)) {
				const { ctx, chartArea: { top, left, width, height } } = chart;
				const centerX = left + width / 2;
				let centerY = top + height / 2;
				const noDataText = this._translationService.instant('COMPONENTS.GENERAL.CHART.NO_DATA')

				if (this.type === 'pie') {
					const radius = Math.min(width, height) * 0.35;
					centerY = centerY * 1.1;

					ctx.save();
					// Draw grey pie background
					ctx.beginPath();
					ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
					ctx.fillStyle = this._backgroundColor;
					ctx.fill();
					ctx.closePath();

					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillStyle = this._primaryTextColor;
					ctx.fillText(noDataText, centerX, centerY);
				}
				if (this.type === 'bar') {
					ctx.save();

					ctx.fillStyle = this._backgroundColor;
					ctx.fillRect(left, top, width, height);

					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillStyle = this._primaryTextColor;
					ctx.fillText(noDataText, centerX, centerY);
				}

				ctx.restore();
			}
		}
	};
}
