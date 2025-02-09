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

@Component({
  selector: 'app-register-user',
  imports: [
    NotificationComponent,
    CommonModule,
    FormsModule,
    NotificationComponent,
    RouterLink,
    ReactiveFormsModule,
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private notificationService: NotificationService
  ) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8,15}$')],
      ],
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  addUser() {
    this.isLoading = true;
  }

  tooglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
