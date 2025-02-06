import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCustomerSchema } from '../../components/add-client/models/AddCustomerSchema';
import { CustomerDto } from '../../components/add-client/models/Customer';
import { Observable } from 'rxjs';
import { UpdateCustomerSchema } from '../../components/add-client/models/UpdateCustomerSchema';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  constructor(private http: HttpClient) {}
  private apiUrl: string = 'http://localhost:8081/api/v1/customer';
  token = localStorage.getItem('token');
  headers: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });
  getCustomers(): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(`${this.apiUrl}`, {
      headers: this.headers,
    });
  }

  saveCustomer(customer: AddCustomerSchema): Observable<CustomerDto> {
    console.log(this.headers);
    return this.http.post<CustomerDto>(`${this.apiUrl}/`, customer, {
      headers: this.headers,
    });
  }

  deleteCustomer(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  updateCustomer(
    customer: UpdateCustomerSchema,
    id: number
  ): Observable<CustomerDto> {
    return this.http.put<CustomerDto>(`${this.apiUrl}/${id}`, customer, {
      headers: this.headers,
    });
  }

  findCustomerByUsernamr(username: string): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(`${this.apiUrl}/${username}`, {
      headers: this.headers,
    });
  }
}
