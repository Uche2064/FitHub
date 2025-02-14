import { AddUserResponseSchema } from './../register-user/models/AddUserResponseScheema';
import { SharedService } from './../../services/shared_service/shared.service';
import { LoginResponseSchema } from './../login/model/LoginResponseSchema';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faArrowDown,
  faArrowAltCircleDown,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth_service/auth.service';
import { UsersInfoComponent } from "../users-info/users-info.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateUserInfo } from '../users-info/models/UpdateUserInfo';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from '../../services/notification_service/notification.service';
import { CustomMessage } from '../../utils/notification/CustomMessage';
import { UserService } from '../../services/user_service/user.service';
import { DeletePopupComponent } from "../delete-popup/delete-popup.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule, DeletePopupComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('userInfoTabAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      transition(':enter', [
        animate('250ms ease-in', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
      transition(':leave', [
        animate('250ms ease-out', style({
          opacity: 0,
          transform: 'translateY(-20px)'
        }))
      ])
    ]),
    trigger('isHiddenAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      transition(':enter', [
        animate('250ms ease-in', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
      transition(':leave', [
        animate('250ms ease-out', style({
          opacity: 0,
          transform: 'translateY(-20px)'
        }))
      ])
    ])
  ]
})
export class NavbarComponent {

  faPerson = faUser;
  faArrowDown = faCaretDown;
  today: number = Date.now();
  formattedDate: string;
  currentUser: LoginResponseSchema = new LoginResponseSchema();
  userInfoForm: FormGroup;
  updatedUser = new UpdateUserInfo();
  isHidden: boolean = true;
  showDeleteDialog = false;
  isUserInfoTabOpen = false;

  constructor(private shareService: SharedService, private authService: AuthService, private fb: FormBuilder, private notificationService: NotificationService, private userService: UserService) {
    this.currentUser = this.shareService.getCurrentUser();

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    this.formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(
      new Date()
    );
    this.userInfoForm = this.fb.group({

      userName: [this.currentUser.userName,],

      email: [this.currentUser.email, [Validators.email]],

      fullName: [this.currentUser.fullName],

      phoneNumber: [this.currentUser.phoneNumber, [Validators.pattern('^[0-9]{8}$')]]

    });
  }

  cancelDelete() {
    this.showDeleteDialog = false;
  }


  openDeleteDialog() {
    this.showDeleteDialog = true;
  }

  confirmDelete() {
    this.deleteAccount()
    this.showDeleteDialog = false;

  }

  private deleteAccount() {
    this.userService.deleteAccount().subscribe((e) => {
      console.log('User account deleted successfully:', e);
      this.notificationService.notify(new CustomMessage('Compte supprimé avec succès!', 'info'));
      this.authService.logout();
    }, (err: HttpErrorResponse) => {
      console.error('Error deleting user account:', err);
      this.notificationService.notify(new CustomMessage('Erreur lors de la suppression du compte', 'error'));
    });
  }

  logout() {
    this.authService.logout();
  }
  toggleUserOption() {
    this.isHidden = !this.isHidden;
  }

  toggleUserInfoTab() {
    this.isHidden = false;
    this.isUserInfoTabOpen = !this.isUserInfoTabOpen;
  }
  closeUserInfoTab() {
    this.isUserInfoTabOpen = false;
  }
  onSubmit() {
    if (this.userInfoForm.valid) {
      this.updatedUser = this.userInfoForm.value;

      this.userService.updateUserInfo(this.updatedUser).subscribe(
        response => {
          console.log('User information updated successfully:', response);
          this.shareService.getCurrentUser()
          window.location.reload()
          this.toggleUserInfoTab();

          this.notificationService.notify(new CustomMessage('Informations mises à jour avec succès!', 'info'));
        },
        error => {
          console.error('Error updating user information:', error);
          this.notificationService.notify(new CustomMessage('Erreur lors de la mise à jour des informations', 'error'));
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
