import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateCustomerSchema } from '../customer/models/UpdateCustomerSchema';
import { UpdateUserInfo } from './models/UpdateUserInfo';
import { SharedService } from '../../services/shared_service/shared.service';

@Component({
  selector: 'app-users-info',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users-info.component.html',
  styleUrl: './users-info.component.css'
})
export class UsersInfoComponent {
  
}
