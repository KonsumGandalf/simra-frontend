import { ChangeDetectionStrategy, Component, HostBinding, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EDangerousColors } from '@simra/common-models';
import { Tooltip } from 'primeng/tooltip';
import { RangePipe } from '../pipes/range.pipe';

/**
 * The displays a horizontal color block with the given color
 */
@Component({
	selector: 'a-color-block',
	standalone: true,
	imports: [CommonModule, RangePipe, Tooltip],
	templateUrl: './color-block.component.html',
	styleUrl: './color-block.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'a-color-block',
	},
})
export class ColorBlockComponent {
	/**
	 * Determines the color of the block
	 */
	color = input.required<EDangerousColors>(); // Default color

	@HostBinding('style.--color') get hostColor() {
		return this.color();
	}
}
