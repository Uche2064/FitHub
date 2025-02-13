import { LoginResponseSchema } from './../login/model/LoginResponseSchema';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faArrowDown,
  faArrowAltCircleDown,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../../services/shared_service/shared.service';
import { AuthService } from '../../services/auth_service/auth.service';
import { UsersInfoComponent } from "../users-info/users-info.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, UsersInfoComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  toogleUserInfoTab: boolean = false;

  faPerson = faUser;
  faArrowDown = faCaretDown;
  today: number = Date.now();
  formattedDate: string;
  currentUser: LoginResponseSchema;
  constructor(private shareService: SharedService, private authService: AuthService) {
    this.currentUser = shareService.getCurrentUser();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short', // "Monday", "Tuesday", etc.
      year: 'numeric', // "2023"
      month: 'short', // "January", "February", etc.
      day: 'numeric', // "1", "2", "3", etc.
    };

    this.formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(
      new Date()
    );
  }
  isHidden: boolean = true;
  logout() {
    this.authService.logout();
  }

  viewUserInfo() {
    console.log(localStorage.getItem('currentUser'));
  }

  toggleUserOption() {
    this.isHidden = !this.isHidden;
  }
}
