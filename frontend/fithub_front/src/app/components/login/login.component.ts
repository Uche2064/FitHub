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

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    NotificationComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private notificationService: NotificationService // Add the notification service here
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.route.navigate(['']);
    }
  }
  isLoading: boolean = false;
  loginCredentials: LoginSchema = new LoginSchema('', '');
  showPassword: boolean = false;

  onSubmit() {
    this.isLoading = true;

    if (this.loginForm.valid) {
      this.loginCredentials = this.loginForm.value;
      console.log(this.loginCredentials);
      this.authService.loginUser(this.loginCredentials).subscribe(
        (response) => {
          this.authService.saveToken(response);

          setTimeout(() => {
            this.notificationService.notify(
              new CustomMessage('Connexion réussie', 'success')
            );
            this.route.navigate(['']);
            this.isLoading = false;
          }, 3000);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.notificationService.notify(
              new CustomMessage('Identifiant ou mot de passe invalide', 'error')
            );
          } else {
            this.notificationService.notify(
              new CustomMessage('Erreur lors de la connexion', 'error')
            );
          }
          this.isLoading = false;
        }
      );
    }
  }

  tooglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
