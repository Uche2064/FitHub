import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { CustomMessage } from '../components/notification/CustomMessage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-client',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
})
export class AddCustomerComponent {
  customerForm: FormGroup;
  message: CustomMessage = new CustomMessage('', '');

  constructor(
    private fb: FormBuilder,
    private notificaiton: NotificationService
  ) {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8,15}$')],
      ],
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  addCustomer() {
    if (this.customerForm.valid) {
      console.log('Customer Data:', this.customerForm.value);
      this.customerForm.reset();
    } else {
      console.log('Veuillez remplir tous les champs correctement!', 'Erreur');
    }
  }
}
