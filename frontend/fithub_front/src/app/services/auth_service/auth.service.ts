import { RefreshTokenSchema } from './../../utils/schemas/RefreshTokenSchema';
import { LoginSchema } from '../../components/login/model/LoginSchema';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseSchema } from '../../components/login/model/LoginResponseSchema';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RefreshTokenResponseSchema } from '../../utils/schemas/RefreshTokenResponseSchema';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AddUserSchema } from '../../components/register-user/models/AddUserSchema';
import { AddUserResponseSchema } from '../../components/register-user/models/AddUserResponseScheema';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_BASE_URL = 'http://localhost:8081/api/v1/auth';
  private readonly loginUrl = `${this.API_BASE_URL}/login`;
  private readonly logoutUrl = `${this.API_BASE_URL}/logout`;
  private readonly registerUrl = `http://localhost:8081/api/v1/user/register`;
  private readonly refreshTokenUrl = `${this.API_BASE_URL}/refresh`;

  private currentUserSubject = new BehaviorSubject<LoginResponseSchema | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.loadStoredUser();
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken && !this.jwtHelper.isTokenExpired(accessToken);
  }

  private loadStoredUser() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.clearStorageAndRedirect();
      }
    }
  }

  refreshToken(): Observable<RefreshTokenResponseSchema> {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      console.log('No refresh token found')
      return throwError(() => new Error('No refresh token found'));
    }

    return this.http.get<RefreshTokenResponseSchema>(`${this.refreshTokenUrl}/${refreshToken}`).pipe(
      tap((response) => {
        console.log('refresh token: ', response)

        if (!response?.accessToken) {
          throw new Error('Invalid refresh response');
        }

        // Only update the access token, keep the existing refresh token
        this.updateAccessToken(response.accessToken);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Token refresh failed:', error);
        this.clearStorageAndRedirect();
        return throwError(() => error);
      })
    );
  }

  private updateAccessToken(newAccessToken: string) {
    localStorage.setItem('access_token', newAccessToken);

    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      currentUser.accessToken = newAccessToken;
      this.currentUserSubject.next(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }

  loginUser(user: LoginSchema): Observable<LoginResponseSchema> {
    return this.http.post<LoginResponseSchema>(this.loginUrl, user).pipe(
      tap((response) => this.handleLoginSuccess(response)),
      catchError((error) => {
        if (error.status === 429) {
          console.error('Trop de tentatives de connexion.');
          return throwError(() => new Error('Trop de tentatives de connexion. Veuillez réessayer plus tard.'));
        }
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  saveUser(newUser: AddUserSchema): Observable<AddUserResponseSchema> {
    return this.http.post<AddUserResponseSchema>(this.registerUrl, newUser);

  }

  private handleLoginSuccess(response: LoginResponseSchema) {
    if (!response?.accessToken || !response?.refreshToken) {
      throw new Error('Invalid login response');
    }
    this.saveToken(response);
  }

  saveToken(token: LoginResponseSchema): Observable<string> {
    try {
      localStorage.setItem('currentUser', JSON.stringify(token));
      localStorage.setItem('access_token', token.accessToken);
      localStorage.setItem('refresh_token', token.refreshToken);
      this.currentUserSubject.next(token);
      return of('Token saved successfully');
    } catch (error) {
      console.error('Error saving token:', error);
      return throwError(() => new Error('Failed to save token'));
    }
  }

  logout() {
    const userId = this.currentUserSubject.value?.userId;

    if (userId) {
      this.http.get(`${this.logoutUrl}/${userId}`).pipe(
        catchError((error) => {
          console.error('Logout request failed:', error);
          return throwError(() => error);
        })
      ).subscribe(() => {
        this.clearStorageAndRedirect();
      });
    } else {
      this.clearStorageAndRedirect();
    }
  }

  private clearStorageAndRedirect() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
