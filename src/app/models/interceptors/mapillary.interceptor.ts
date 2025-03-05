import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { APP_CONFIG, MAPILLARY_API_BASE_SEGMENT } from '@simra/common-models';
import { Observable } from 'rxjs';

export function mapillaryInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const mapillaryUrl = inject(APP_CONFIG).mapillaryUrl;
  const mapillaryToken = inject(APP_CONFIG).mapillaryAccessToken;

  if (!req.url.startsWith(MAPILLARY_API_BASE_SEGMENT)) {
    return next(req);
  }

  const mapillaryReq = req.clone({
    url: req.url.replace(MAPILLARY_API_BASE_SEGMENT, mapillaryUrl),
    params: req.params.set('access_token', mapillaryToken),
  });

  return next(mapillaryReq);
}
