import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from '../../components/menu-bar/component/menu-bar.component';

@Component({
	selector: 'app-root-layout',
	imports: [CommonModule, RouterOutlet, MenuBarComponent ],
	templateUrl: './root.layout.html',
	styleUrl: './root.layout.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'app-root-layout',
	},
})
export class RootLayoutComponent {}
