import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerServiceService } from '../../../services/customer_service/customer-service.service';
import { CustomerDto } from '../models/Customer';

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  sortBy: string = "firstName";
  sortDirection: any;
  showFilters: boolean = false; // Controls filter visibility


  customers: CustomerDto[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 1; // Default total pages
  constructor(private router: Router, private customerService: CustomerServiceService) { }
  ngOnInit(): void {
    this.loadCustomers();
    this.customerService.totalPages$.subscribe((totalPages) => {
      this.totalPages = totalPages;
    });

  }
  changeSort(sortField: string) {
    if (this.sortBy === sortField) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortField;
      this.sortDirection = 'asc';
    }
    this.loadCustomers();
  }
  loadCustomers() {
    this.customerService.fetchCustomers(this.currentPage, this.pageSize, this.sortBy);
    this.customerService.getCustomers().subscribe(
      (data: CustomerDto[]) => {
        this.customers = data;
        this.totalPages = this.currentPage;
      },
      error => console.error('Error fetching customers:', error)
    );
  }

  nextPage() {
    this.currentPage++;
    this.loadCustomers();
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadCustomers();
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  viewCustomerDetails(customer: CustomerDto) {
    console.log(customer);
  }


}
