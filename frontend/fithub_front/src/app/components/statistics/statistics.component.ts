import { Component } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionDto } from '../subscription/models/SubscriptionDto';

@Component({
  selector: 'app-statistics',
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  subscriptions: SubscriptionDto[] = [];
  totalActiveClients: number = 0;

  constructor(private subscriptionService: SubscriptionService) {}
  ngOnInit() {
    // Fetch subscriptions data from your service
    this.fetchSubscriptions();
  }

  fetchSubscriptions() {
     this.subscriptionService.getSubscriptions().subscribe((data) => {
      this.subscriptions = data;
     });
    this.calculateActiveClients();
  }

  calculateActiveClients() {
    this.totalActiveClients = this.subscriptions.filter(sub => sub.active).length;
  }
}
