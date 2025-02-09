import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCustomerSchema } from '../../components/customer/models/AddCustomerSchema';
import { CustomerDto } from '../../components/customer/models/Customer';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UpdateCustomerSchema } from '../../components/customer/models/UpdateCustomerSchema';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  constructor(private http: HttpClient) {
  }
  private apiUrl: string = 'http://localhost:8081/api/v1/customer';
  private customersSubject = new BehaviorSubject<CustomerDto[]>([]);
  private totalPagesSubject = new BehaviorSubject<number>(1); // Store total pages
  public customers$ = this.customersSubject.asObservable();
  public totalPages$ = this.totalPagesSubject.asObservable(); // Expose

  fetchCustomers(page: number = 0, size: number = 5, sort: string = "nom", direction: string = "asc") {

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', `${sort},${direction}`);

    this.http.get<{ content: CustomerDto[], totalPages: number }>(this.apiUrl, { params }).subscribe(
      response => {
        console.log('Customers fetched:', response.content);
        this.customersSubject.next(response.content);
        this.totalPagesSubject.next(response.totalPages);
      },
      error => console.error('Error fetching customers:', error)
    );
  }
  getCustomers(): Observable<CustomerDto[]> {
    return this.customers$;
  }

  saveCustomer(customer: AddCustomerSchema): Observable<CustomerDto> {
    return this.http.post<CustomerDto>(`${this.apiUrl}`, customer).pipe(tap(() => { this.fetchCustomers(0, 5) }));
  }

  deleteCustomer(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).pipe(tap(() => this.fetchCustomers(0, 5)));
  }

  updateCustomer(
    customer: UpdateCustomerSchema,
    id: number
  ): Observable<CustomerDto> {
    return this.http.put<CustomerDto>(`${this.apiUrl}/${id}`, customer).pipe(tap(() => this.fetchCustomers(0, 5)));
  }

  findCustomerByUsernamr(username: string): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(`${this.apiUrl}/${username}`);
  }
}
