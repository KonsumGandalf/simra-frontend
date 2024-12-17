import { effect, signal, Signal } from '@angular/core';
import { firstValueFrom, isObservable, Observable } from 'rxjs';

/**
 * Creates a signal that is updated asynchronously by the given computation.
 * Resembles what the `resource` function from Angular 19 does
 * Copied from `stackoverflow.com/questions/76571331/using-async-await-in-angular-computed-signal`
 *
 * @param computation
 */
export function asyncComputed<T>(
	computation: () => Observable<T> | Promise<T> | T | undefined | null,
): Signal<T> {
	console.log('computation', computation);
	const resultSignal = signal<T>(undefined as unknown as T);

	effect(
		async () => {
			const result = computation();
			const unwrappedResult = await (isObservable(result)
				? firstValueFrom(result as Observable<T>, { defaultValue: null })
				: result);

			resultSignal.set(unwrappedResult as unknown as T);
		},
		{ allowSignalWrites: true },
	);

	return resultSignal.asReadonly();
}
