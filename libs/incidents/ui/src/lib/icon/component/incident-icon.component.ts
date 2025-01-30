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
	tooltips!: string[];

	@Input()
	tooltipPrefix ?: string;

	@Input({required: true})
	names!: string[];

	protected totalTooltip(): string {
		const tooltipContent = this.tooltips.join(', ');
		return this.tooltipPrefix ? `${this.tooltipPrefix}: ${tooltipContent}` : tooltipContent;
	}
}
