import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
	selector: 'a-last-run',
	imports: [CommonModule, Skeleton, TranslatePipe],
	templateUrl: './last-run.component.html',
	styleUrl: './last-run.component.scss',
	host: {
		class: 'a-last-run',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class LastRunComponent {
	public date = input.required<Date | undefined>();
}
