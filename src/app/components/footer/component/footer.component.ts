import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedModule } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';

@Component({
	selector: 'app-footer',
	imports: [CommonModule, SharedModule, TranslatePipe, ButtonDirective],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'app-footer',
	},
})
export class FooterComponent {
	protected readonly _currentDate = new Date();
}
