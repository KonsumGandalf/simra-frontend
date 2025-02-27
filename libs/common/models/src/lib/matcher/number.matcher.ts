import { UrlMatchResult, UrlSegment } from '@angular/router';

/**
 * Checks the url on the first segment being a number
 *
 * @param segments The url segments
 *
 * @example
 * /23234 -> { consumed: [23234], posParams: { streetId: 23234 } }
 * /foo -> null -> shell does not match the url
 */
export function numberMatcher(segments: UrlSegment[]): UrlMatchResult | null {
	if (segments.length === 1 && /^\d+$/.test(segments[0].path)) {
		return {
			consumed: segments,
			posParams: { streetId: segments[0] }
		};
	}
	return null;
}
