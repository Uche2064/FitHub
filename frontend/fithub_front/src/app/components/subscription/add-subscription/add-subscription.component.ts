import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscriptions } from '../models/Subscriptions';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../../services/subscription.service';
import { CustomerServiceService } from '../../../services/customer_service/customer-service.service';
import { NotificationService } from '../../../services/notification_service/notification.service';
import { PackServiceService } from '../../../services/pack_service/pack-service.service';
import { CustomerDto } from '../../customer/models/Customer';
import { PackResponseSchema } from '../../pack/model/PackResponseSchema';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomMessage } from '../../../utils/notification/CustomMessage';

@Component({
  selector: 'app-add-subscription',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-subscription.component.html',
  styleUrl: './add-subscription.component.css'
})
export class AddSubscriptionComponent {
  subscription: Subscriptions = new Subscriptions();
  subscriptionForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
    private customerService: CustomerServiceService,
    private packService: PackServiceService,
    private notificationService: NotificationService
  ) {
    this.subscriptionForm = this.fb.group({
      customerId: ['', Validators.required],
      packId: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }
  @Output() loadSubscription = new EventEmitter<void>();
  @Output() loadCustomersWithInactiveSub = new EventEmitter<void>();
  @Input() packs: PackResponseSchema[] = [];
  @Input() customers: CustomerDto[] = [];
  enregister() {
    if (this.subscriptionForm.valid) {
      this.subscription = this.subscriptionForm.value;
      console.log(this.subscriptionForm.value)
      this.subscriptionService.subscribeCustomer(this.subscription).subscribe(
        () => {
          this.onLoadSubscription();
          this.onLoadCustomersWithInactiveSub();

          this.notificationService.notify(new CustomMessage('Souscription de l\'utilisateur réussit', 'success'))
          this.subscriptionForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  onLoadSubscription() {
    this.loadSubscription.emit();
  }

  onLoadCustomersWithInactiveSub() {
    this.loadCustomersWithInactiveSub.emit()
  }

}
