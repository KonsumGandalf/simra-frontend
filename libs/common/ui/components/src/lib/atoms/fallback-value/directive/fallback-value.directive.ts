import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
	selector: '[aFallbackValue]',
})
export class FallbackValueDirective {
	private readonly _elementRef = inject(ElementRef);
	private readonly _renderer = inject(Renderer2);
	private readonly _translateService = inject(TranslateService);

	fallback = input('COMPONENTS.GENERAL.TABLE.ITEMS.NO_DATA');

	constructor() {
		effect(() => {
			const value = this._elementRef.nativeElement.textContent.trim();
			if (value) {
				return ;
			}

			const translatedFallback = this._translateService.instant(this.fallback());
			this._renderer.setProperty(this._elementRef.nativeElement, 'textContent', translatedFallback);
		});
	}
}
