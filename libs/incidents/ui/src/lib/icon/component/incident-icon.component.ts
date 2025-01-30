import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';

@Component({
	selector: 'a-icon',
	standalone: true,
	imports: [CommonModule, Tooltip],
	templateUrl: './incident-icon.component.html',
	styleUrl: './incident-icon.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'a-icon',
	},
})
export class IncidentIconComponent {
	@Input({required: true})
	tooltip!: string;

	@Input()
	tooltipPrefix ?: string;

	@Input({required: true})
	name!: string;

	protected totalTooltip(): string {
		return this.tooltipPrefix ? `${this.tooltipPrefix}: ${this.tooltip}` : this.tooltip;
	}
}
