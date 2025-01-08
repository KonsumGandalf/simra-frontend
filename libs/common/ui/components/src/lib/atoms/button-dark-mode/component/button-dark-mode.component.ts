import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ToggleSwitch } from 'primeng/toggleswitch';

/**
 * The component allows to toggle between dark and light mode
 */
@Component({
	selector: 'm-button-dark-mode',
	standalone: true,
	imports: [CommonModule, Button, ToggleSwitch, FormsModule],
	templateUrl: './button-dark-mode.component.html',
	styleUrl: './button-dark-mode.component.scss',
	host: {
		class: 'm-button-dark-mode',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDarkModeComponent {
	toggleDarkMode() {
		const element = document.querySelector('html');
		element?.classList.toggle('dark');
	}
}
