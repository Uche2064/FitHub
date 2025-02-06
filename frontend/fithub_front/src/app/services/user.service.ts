import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginSchema } from '../models/LoginSchema';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  apiUrl: string = 'http://localhost:8080';
}
