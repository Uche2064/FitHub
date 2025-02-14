import { UserService } from './../user_service/user.service';
import { Injectable } from '@angular/core';
import { LoginResponseSchema } from '../../components/login/model/LoginResponseSchema';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth_service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentUser: LoginResponseSchema = JSON.parse(localStorage.getItem('currentUser') ?? "");
  private isUserInfoTabVisible = new BehaviorSubject<any>(null);


  constructor(private userService: UserService) {}
  getCurrentUser(): LoginResponseSchema {
    this.userService.getCurrentUser().subscribe((res) => {
      this.currentUser = res
    })
    return this.currentUser
  }




}
