import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-not-found',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './not-found.page.html',
	styleUrl: './not-found.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'app-not-found',
	},
})
export class NotFoundPage {}
