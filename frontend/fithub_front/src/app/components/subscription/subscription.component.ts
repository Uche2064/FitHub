import { CustomerServiceService } from './../../services/customer_service/customer-service.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionService } from '../../services/subscription.service';
import { CommonModule } from '@angular/common';
import { PackServiceService } from '../../services/pack_service/pack-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PackResponseSchema } from '../pack/model/PackResponseSchema';
import { CustomerDto } from '../customer/models/Customer';
import { Subscriptions } from './models/Subscriptions';
import { NotificationService } from '../../services/notification_service/notification.service';
import { CustomMessage } from '../../utils/notification/CustomMessage';
import { SubscriptionDto } from './models/SubscriptionDto';
import { DeletePopupComponent } from "../delete-popup/delete-popup.component";
import { NotificationComponent } from "../../utils/notification/notification.component";
import { SubscriptionListComponent } from "./subscription-list/subscription-list.component";
import { AddSubscriptionComponent } from "./add-subscription/add-subscription.component";

@Component({
  selector: 'app-subscription',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NotificationComponent, SubscriptionListComponent, AddSubscriptionComponent],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'] // Fixed typo from styleUrl to styleUrls
})
export class SubscriptionComponent implements OnInit {
  subscriptionForm: FormGroup;
  packs: PackResponseSchema[] = [];
  customers: CustomerDto[] = [];
  subscriptionToDelete: number = 0;
  showFilters: boolean = false;

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

  ngOnInit() {
    this.loadPacks();
    this.loadCustomersWithInactiveSub();
  }

  loadPacks() {
    this.packService.fetchPacks();
    this.packService.getPacks().subscribe(
      (response: PackResponseSchema[]) => {
        this.packs = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching packs:', error);
        this.notificationService.notify(new CustomMessage('Erreur lors de la récupération des packs', 'error'));
      }
    );
  }

  loadCustomersWithInactiveSub() {
    this.customerService.getAllCustomerWithInactiveSub().subscribe(
      (customers: CustomerDto[]) => {
        this.customers = customers;
        console.log(customers);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching customers:', error);
        this.notificationService.notify(new CustomMessage('Erreur lors de la récupération des clients', 'error'));
      }
    );
  }
}
