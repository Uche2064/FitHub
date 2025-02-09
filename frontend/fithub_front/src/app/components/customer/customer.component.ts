import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification_service/notification.service';
import { CustomMessage } from '../../utils/notification/CustomMessage';
import { CustomerServiceService } from '../../services/customer_service/customer-service.service';
import { AddCustomerSchema } from './models/AddCustomerSchema';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-customer',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AddCustomerComponent,
    CustomerListComponent,
    AddCustomerComponent,
  ],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(-10px)' })),
      transition(':enter', [
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',

})
export class CustomerComponent {
  isAddClientClicked: boolean = false;

  toggleAddClientForm() {
    this.isAddClientClicked = !this.isAddClientClicked;
  }
}
