import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, tap, throwError } from 'rxjs';
import { AuthService } from './services/auth_service/auth.service';

const isRefreshing = { value: false };
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const excludedUrls = ['/login', '/register'];

  const isExcluded = excludedUrls.some(url => request.url.includes(url));

  if (isExcluded) {
    return next(request);
  }


  const addToken = (request: HttpRequest<any>, token: string) => {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  const handle401Error = (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
    if (!isRefreshing.value) {
      isRefreshing.value = true;
      refreshTokenSubject.next(null);

      return authService.refreshToken().pipe(
        tap((token) => {
          isRefreshing.value = false;
          refreshTokenSubject.next(token.accessToken);
        }),
        switchMap((token) => next(addToken(request, token.accessToken))),
        catchError((error) => {
          isRefreshing.value = false;
          authService.logout();
          return throwError(() => error);
        })
      );
    }

    return refreshTokenSubject.pipe(
      filter((token): token is string => token !== null),
      take(1),
      switchMap(token => next(addToken(request, token)))
    );
  };

  const token = localStorage.getItem('access_token');

  if (token) {
    request = addToken(request, token);
  }

  return next(request).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(request);
      }
      return throwError(() => error);
    })
  );
};
