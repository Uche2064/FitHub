import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginSchema } from '../../models/LoginSchema';
import { AuthService } from '../../services/auth_service/auth.service';
import { NotificationService } from '../../services/notification_service/notification.service';
import { CustomMessage } from '../../utils/notification/CustomMessage';
import { NotificationComponent } from '../../utils/notification/notification.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, NotificationComponent, RouterLink],
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

  onSubmit() {
    this.isLoading = true;
    this.authService.loginUser(this.loginCredentials).subscribe(
      (token) => {
        this.authService.saveToken(token.token);
        this.notificationService.notify(
          new CustomMessage('Connexion réussie', 'success')
        );
        setTimeout(() => {
          this.route.navigate(['']);
          this.isLoading = false;

        }, 3000);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.notificationService.notify(
          new CustomMessage("Identifiant invalide", 'error')
        );
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
