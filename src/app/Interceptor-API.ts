import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { findCookie } from './loadCookie';

export function InterceptorAPI(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const secureRoutes = [getApiUrl()];

  if (!secureRoutes.find((x) => request.url.startsWith(x))) {
    return next(request);
  }

  request = request.clone({
    headers: request.headers.set(
      'X-XSRF-TOKEN',
      findCookie('XSRF-RequestToken')
    ),
  });

  return next(request);
}

function getApiUrl() {
  const backendHost = getCurrentHost();

  return `${backendHost}/api/`;
}

function getCurrentHost() {
  const host = window.location.host;
  const url = `${window.location.protocol}//${host}`;
  return url;
}