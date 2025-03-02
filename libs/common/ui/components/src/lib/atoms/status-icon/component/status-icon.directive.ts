import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

/**
 * Directive to display icons which represent a status like true or false
 */
@Directive({
	selector: 'i',
})
export class StatusIconDirective {
	private readonly _elementRef = inject(ElementRef);
	private readonly _renderer = inject(Renderer2);

	status = input<any>();

	constructor() {
		effect(() => {
			const status = this.status();

			if (typeof status === 'boolean') {
				this._renderer.addClass(this._elementRef.nativeElement, status ? 'ph-check-circle' : 'ph-x-circle');
			}
		});
	}
}
