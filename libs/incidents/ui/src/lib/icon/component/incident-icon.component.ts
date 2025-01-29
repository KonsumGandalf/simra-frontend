import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Tooltip } from 'primeng/tooltip';

@Component({
	selector: 'a-icon',
	standalone: true,
	imports: [CommonModule, TranslatePipe, Tooltip],
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

	@Input({required: true})
	name!: string;
}
