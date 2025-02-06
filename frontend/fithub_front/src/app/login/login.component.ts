import { LoginSchema } from './../models/LoginSchema';
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from '../components/notification/notification.component';
import { NotificationService } from '../services/notification.service';
import { CustomMessage } from '../components/notification/CustomMessage';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: Router,
    private notificationService: NotificationService // Add the notification service here
  ) {}
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.route.navigate(['']);
    }
  }
  isLoading: boolean = false;
  loginCredentials: LoginSchema = new LoginSchema('', '');
  showPassword: boolean = false;
  message: CustomMessage = new CustomMessage('', '');
  onSubmit() {
    this.isLoading = true;
    this.authService.loginUser(this.loginCredentials).subscribe(
      (token) => {
        this.authService.saveToken(token.token);
        this.message.content = 'Connexion réussie';
        this.message.type = 'success';
        this.notificationService.notify(this.message);
        setTimeout(() => {
          this.route.navigate(['']);
          this.isLoading = false;
        }, 2000);
      },
      (error: HttpErrorResponse) => {
        this.message.content = 'Identifiants invalides.';
        this.message.type = 'error';
        this.notificationService.notify(this.message);
        this.isLoading = false;
      }
    );
  }

  tooglePasswordVisibility() {
    if (this.loginCredentials.password != '') {
      this.showPassword = !this.showPassword;
    }
  }
}
