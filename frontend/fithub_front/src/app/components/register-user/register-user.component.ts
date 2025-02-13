import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginSchema } from '../login/model/LoginSchema';
import { AuthService } from '../../services/auth_service/auth.service';
import { NotificationService } from '../../services/notification_service/notification.service';
import { CustomMessage } from '../../utils/notification/CustomMessage';
import { NotificationComponent } from '../../utils/notification/notification.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddUserSchema } from './models/AddUserSchema';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-user',
  imports: [
    NotificationComponent,
    CommonModule,
    FormsModule,
    NotificationComponent,
    RouterLink,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {
  userForm: FormGroup;
  message: CustomMessage = new CustomMessage('', '');
  user: AddUserSchema = new AddUserSchema('', '', '', '', '');
  isLoading: boolean = false;
  showPassword: boolean = false;
  errors: [] = [];
  loginCredentials: LoginSchema = new LoginSchema('', '');
  isDarkMode = false;
  faMoon = faMoon;
  faSun = faSun;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private notificationService: NotificationService
  ) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8}$')],
      ],
      userName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  addUser() {
    this.isLoading = true;
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      this.user = this.userForm.value;
      this.loginCredentials = new LoginSchema(this.user.userName, this.user.password);
      console.log("Login: " + this.loginCredentials.userName + " " + this.loginCredentials.password);
      this.authService.saveUser(this.user).subscribe((newUser) => {
        if (newUser) {
          this.isLoading = false;
          this.notificationService.notify(new CustomMessage('Utilisateur crée avec succès.', 'success'));
          this.route.navigate(['/login']);
        }
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false
        this.notificationService.notify(new CustomMessage(error.error, 'error'))
      })
    }
  }


  tooglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  toggleDarkMode() {
    this.isDarkMode = !JSON.parse(localStorage.getItem('isDarkMode')!);
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
    document.body.classList.toggle('dark', this.isDarkMode);
  }

}
