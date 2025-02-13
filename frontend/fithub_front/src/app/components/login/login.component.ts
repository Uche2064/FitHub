import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginSchema } from './model/LoginSchema';
import { AuthService } from '../../services/auth_service/auth.service';
import { NotificationService } from '../../services/notification_service/notification.service';
import { CustomMessage } from '../../utils/notification/CustomMessage';
import { NotificationComponent } from '../../utils/notification/notification.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    NotificationComponent,
    RouterLink,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean = false;
  loginCredentials: LoginSchema = new LoginSchema('', '');
  showPassword: boolean = false;
  faMoon = faMoon;
  faSun = faSun;
  isDarkMode = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.route.navigate(['']);
    }
  }

  onSubmit() {
    this.isLoading = true;

    if (this.loginForm.valid) {
      this.loginCredentials = this.loginForm.value;
      this.authService.loginUser(this.loginCredentials).subscribe(
        (response) => {
          this.authService.saveToken(response);
          this.notificationService.notify(new CustomMessage('Connexion réussie', 'success'));
          this.route.navigate(['']);
          this.isLoading = false;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if(error.status === 0) {
            this.notificationService.notify(new CustomMessage('Serveur indisponible', 'error'));
            this.isLoading = false;
            return;
          }
          if (error.status === 429) {
            this.notificationService.notify(new CustomMessage('Trop de tentatives de connexion. Veuillez réessayer plus tard.', 'error'));
          } else {
            this.notificationService.notify(new CustomMessage('Identifiant ou mot de passe invalide', 'error'));
          }
          this.isLoading = false;
        }
      );
    }
  }




  toggleDarkMode() {
    this.isDarkMode = !JSON.parse(localStorage.getItem('isDarkMode')!);
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  tooglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


}
