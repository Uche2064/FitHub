import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeletePopupComponent } from '../../delete-popup/delete-popup.component';
import { SubscriptionDto } from '../models/SubscriptionDto';
import { SubscriptionService } from '../../../services/subscription.service';
import { NotificationService } from '../../../services/notification_service/notification.service';
import { CustomMessage } from '../../../utils/notification/CustomMessage';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

registerLocaleData(localeFr);

@Component({
  selector: 'app-subscription-list',
  imports: [DeletePopupComponent, CommonModule, FormsModule],
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css'] // Fixed typo from styleUrl to styleUrls
})
export class SubscriptionListComponent implements OnInit {
  subscriptionToDelete: number = 0;
  showDeleteDialog: boolean = false;
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 1;
  sortBy: string = "customer";
  sortDirection: any;
  subscriptions: SubscriptionDto[] = [];

  @Output() loadCustomersWithInactiveSub = new EventEmitter<void>();

  constructor(private subscriptionService: SubscriptionService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadSubscriptions();
    this.loadCustomersWithInactiveSub.emit();
  }

  openDeleteDialog(id: number) {
    this.subscriptionToDelete = id;
    this.showDeleteDialog = true;
  }

  loadSubscriptions() {
    this.subscriptionService.fetSubscriptions(this.currentPage, this.pageSize, this.sortBy);
    this.subscriptionService.getPaginatedSubscriptions().subscribe(
      (data: SubscriptionDto[]) => {
        this.subscriptions = data;
        this.subscriptionService.totalPages$.subscribe(total => this.totalPages = total);
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.notificationService.notify(new CustomMessage('Erreur lors de la récupération', 'error'));
      }
    );
  }

  get filteredSubscriptions() {
    if (!this.searchTerm) {
      return this.subscriptions;
    }
    return this.subscriptions.filter(subscription =>
      `${subscription.customer.firstName} ${subscription.customer.lastName}`
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  changeSort(sortField: string) {
    if (this.sortBy === sortField) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortField;
      this.sortDirection = 'asc';
    }
    this.loadSubscriptions();
  }

  cancelDelete() {
    this.showDeleteDialog = false;
  }

  nextPage() {
    this.currentPage++;
    this.loadSubscriptions();
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadSubscriptions();
    }
  }

  confirmDelete() {
    this.cancelSubscription(this.subscriptionToDelete);
    this.loadSubscriptions();
    this.loadCustomersWithInactiveSub.emit();
    this.showDeleteDialog = false;
  }

  cancelSubscription(subscriptionId: number) {
    this.subscriptionService.cancelSubscription(subscriptionId).subscribe(() => {
      this.loadSubscriptions();
      this.loadCustomersWithInactiveSub.emit();
      this.notificationService.notify(new CustomMessage('Résiliation de la souscription réussie', 'info'));
    });
  }
}
