import { Directive, effect, ElementRef, inject, input, Renderer2, resource } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Directive({
	selector: '[aFallbackValue]',
})
export class FallbackValueDirective {
	private readonly _elementRef = inject(ElementRef);
	private readonly _renderer = inject(Renderer2);
	private readonly _translateService = inject(TranslateService);

	fallback = input('COMPONENTS.GENERAL.TABLE.ITEMS.NO_DATA');

	private readonly langSignal = toSignal(this._translateService.onLangChange);

	private readonly _translation$ = resource({
		request: () => this.langSignal() ?? this._translateService.currentLang,
		loader: async () => {
			return await firstValueFrom(this._translateService.get(this.fallback()));
		}
	});

	constructor() {
		effect(() => {
			const translated = this._translation$.value();
			if (translated) {
				this._renderer.setProperty(this._elementRef.nativeElement, 'textContent', translated);
			}
		});

	}
}
