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
import { NotificationComponent } from '../../utils/notification/notification.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-client',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NotificationComponent,
  ],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
})
export class AddCustomerComponent {
  customerForm: FormGroup;
  message: CustomMessage = new CustomMessage('', '');
  customer: AddCustomerSchema = new AddCustomerSchema('', '', '', '', new Date());
  constructor(
    private fb: FormBuilder,
    private notificaiton: NotificationService,
    private customerService: CustomerServiceService
  ) {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8,15}$')],
      ],
      userName: ['', [Validators.required, Validators.minLength(4)]],
      registrationDate: ['', Validators.required]
    });
  }

  addCustomer() {
    if (this.customerForm.valid) {
      this.customer = this.customerForm.value;
      this.customerService.saveCustomer(this.customer).subscribe(
        (customer) => {
          this.notificaiton.notify(
            new CustomMessage('Client ajouté avec succès!', 'success')
          );
          this.customerForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.notificaiton.notify(new CustomMessage(error.error, 'error'));
          this.customerForm.reset();
        }
      );
    } else {
      console.log('Veuillez remplir tous les champs correctement!', 'Erreur');
    }
  }
}
