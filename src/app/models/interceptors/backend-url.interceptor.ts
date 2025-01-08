import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_BASE_SEGMENT, APP_CONFIG, JPA_API_BASE_SEGMENT } from '@simra/common-models';
import { Observable } from 'rxjs';

/**
 * Interceptor that prepends the backend URL to the request URL.
 *
 * @param req
 * @param next
 */
export function backendUrlInterceptor(
	req: HttpRequest<unknown>,
	next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
	const apiUrl = inject(APP_CONFIG).apiUrl;
	let constructedUrl = `${apiUrl}`;

	if (!req.url.startsWith(API_BASE_SEGMENT) && !req.url.startsWith(JPA_API_BASE_SEGMENT)) {
		return next(req);
	}

	if (req.url.startsWith(JPA_API_BASE_SEGMENT)) {
		constructedUrl += `${req.url.replace(/^\/api\/jpa/, '')}`;
	} else if (req.url.startsWith(API_BASE_SEGMENT)) {
		constructedUrl += `${req.url}`;
	}

	const backendReq = req.clone({
		url: constructedUrl,
	});
	return next(backendReq);
}
