import { RefreshTokenSchema } from './../../utils/schemas/RefreshTokenSchema';
import { LoginSchema } from '../../components/login/model/LoginSchema';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseSchema } from '../../components/login/model/LoginResponseSchema';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, Subject, tap, throwError } from 'rxjs';
import { AuthCheckSchema } from '../../global_model/AuthCheckSchema';
import { RefreshTokenResponseSchema } from '../../utils/schemas/RefreshTokenResponseSchema';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.loadStoredUser();
  }
  private loginUrl: string = 'http://localhost:8081/api/v1/auth/login';
  private logoutUrl: string = 'http://localhost:8081/api/v1/auth/logout';
  private checkUrl: string = 'http://localhost:8081/api/v1/auth/check';
  private refreshTokenUrl: string = 'http://localhost:8081/api/v1/auth/refresh';


  private currentUserSubject = new BehaviorSubject<LoginResponseSchema | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) return false;
    return !this.jwtHelper.isTokenExpired(accessToken);
  }

  private loadStoredUser() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  refreshToken(): Observable<RefreshTokenResponseSchema> {
    const refreshToken = localStorage.getItem('refresh_token');

    return this.http.post<RefreshTokenResponseSchema>(`${this.refreshTokenUrl}`, new RefreshTokenSchema(refreshToken ?? '')).pipe(
      tap((response) => {
        localStorage.setItem("access_token", response.accessToken);
        const currentUser = this.currentUserSubject.value;
        if (currentUser) {
          currentUser.accessToken = response.accessToken;
          this.currentUserSubject.next(currentUser);
        }
      }),
      catchError((error) => {
        this.logout();
        console.error(error);
        return throwError(error);
      })
    );

  }


  logout() {
    const userId = this.currentUserSubject.value?.userId;
    console.log(this.currentUserSubject.value);

    if (userId) {
      this.http.get(`${this.logoutUrl}/${userId}`);
    }

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  loginUser(user: LoginSchema): Observable<LoginResponseSchema> {
    const token = this.http.post<LoginResponseSchema>(this.loginUrl, user);
    return token;
  }

  saveToken(token: LoginResponseSchema) {
    localStorage.setItem('currentUser', JSON.stringify(token));
    localStorage.setItem('access_token', token.accessToken);
    localStorage.setItem('refresh_token', token.refreshToken);
    return of('token saved');
  }

}
