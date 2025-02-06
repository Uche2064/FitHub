import { LoginSchema } from '../models/LoginSchema';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseSchema } from '../models/LoginResponseSchema';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}
  private loginUrl: string = 'http://localhost:8081/api/v1/auth/user/login';
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loginUser(user: LoginSchema): Observable<LoginResponseSchema> {
    console.log(user);
    return this.http.post<LoginResponseSchema>(this.loginUrl, user);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    return of('token saved');
  }
}
