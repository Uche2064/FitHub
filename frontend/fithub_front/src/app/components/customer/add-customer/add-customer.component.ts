import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HttpErrorResponse } from '@angular/common/http';
import { NotificationComponent } from '../../../utils/notification/notification.component';
import { CustomerServiceService } from '../../../services/customer_service/customer-service.service';
import { NotificationService } from '../../../services/notification_service/notification.service';
import { CustomMessage } from '../../../utils/notification/CustomMessage';
import { AddCustomerSchema } from '../models/AddCustomerSchema';

@Component({
  selector: 'app-add-customer',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
})
export class AddCustomerComponent {
  customerForm: FormGroup;
  isLoading: boolean = false;
  message: CustomMessage = new CustomMessage('', '');
  customer: AddCustomerSchema = new AddCustomerSchema(
    '',
    '',
    ''
  );
  constructor(
    private fb: FormBuilder,
    private notificaiton: NotificationService,
    private customerService: CustomerServiceService,
  ) {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8}$')],
      ],
    });
  }

  addCustomer() {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      this.isLoading = true;
      this.customer = this.customerForm.value;
      this.customerService.saveCustomer(this.customer).subscribe(
        (customer) => {
          console.log(customer);
          this.notificaiton.notify(
            new CustomMessage('Client ajouté avec succès!', 'success')
          );
          this.isLoading = false;
          this.customerService.fetchCustomers()
          this.customerForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.log(typeof error.error);
          if (typeof error.error === 'object') {
            this.notificaiton.notify(new CustomMessage('Erreur lors de l\'ajout. Veuillez réessayer plus tard', 'error'));
            return;
          } else {
            this.notificaiton.notify(new CustomMessage(error.error, 'error'));

          }
          this.isLoading = false;
        }
      );
    } else {
      console.log('Veuillez remplir tous les champs correctement!', 'Erreur');
    }
  }
}
