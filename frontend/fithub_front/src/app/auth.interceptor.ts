import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from './services/auth_service/auth.service';

const isRefreshing = { value: false };
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);

  const excludedUrls = ['/login', '/register', '/refresh'];
  const isExcluded = excludedUrls.some(url => request.url.includes(url));

  if (isExcluded) {
    return next(request);
  }
  const headers: HttpHeaders = new HttpHeaders(
  );
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

        switchMap((response) => {
          console.log("refreshing token: ", response)
          isRefreshing.value = false;
          refreshTokenSubject.next(response.accessToken);

          const newRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`
            }
          });

          return next(newRequest);
        }),
        catchError((error) => {
          isRefreshing.value = false;
          refreshTokenSubject.next(null);
          authService.logout();
          return throwError(() => new Error('Token refresh failed'));
        })
      );
    }

    return refreshTokenSubject.pipe(
      filter((token): token is string => token !== null),
      take(1),
      switchMap(token => {
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(newRequest);
      })
    );
  };

  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    request = addToken(request, accessToken);
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
