import { Injectable } from '@angular/core';
import { LoginResponseSchema } from '../../components/login/model/LoginResponseSchema';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentUser: LoginResponseSchema = JSON.parse(localStorage.getItem('currentUser') ?? "");
  getCurrentUser(): LoginResponseSchema {
    return this.currentUser
  }

}
