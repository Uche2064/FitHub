import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscriptions } from '../components/subscription/models/Subscriptions';
import { SubscriptionDto } from '../components/subscription/models/SubscriptionDto';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private readonly subscriptionUrl = "http://localhost:8081/api/v1/subscription";

  private totalPagesSubject = new BehaviorSubject<number>(1);
  private subscriptionSubject = new BehaviorSubject<SubscriptionDto[]>([]);

  // Public observables for components to subscribe
  public subscriptions$ = this.subscriptionSubject.asObservable();
  public totalPages$ = this.totalPagesSubject.asObservable();

  constructor(private http: HttpClient) { }

  fetSubscriptions(page: number = 0, size: number = 5, sort: string = "monthlyPrice", direction: string = "asc") {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', `${sort},${direction}`);

    this.http.get<{ content: SubscriptionDto[], totalPages: number }>(this.subscriptionUrl, { params }).subscribe(
      response => {
        this.subscriptionSubject.next(response.content);
        this.totalPagesSubject.next(response.totalPages);
      },
      error => {
        console.error('Error fetching subscriptions:', error);
      }
    );
  }

  getPaginatedSubscriptions(): Observable<SubscriptionDto[]> {
    return this.subscriptions$;
  }

  subscribeCustomer(data: Subscriptions): Observable<Subscriptions> {
    return this.http.post<Subscriptions>(`${this.subscriptionUrl}/`, data);
  }

  getSubscriptions(): Observable<SubscriptionDto[]> {
    return this.http.get<SubscriptionDto[]>(`${this.subscriptionUrl}/`);
  }

  cancelSubscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.subscriptionUrl}/cancel/${id}`);
  }
}
