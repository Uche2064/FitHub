import { NotificationService } from './../../../services/notification_service/notification.service';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerServiceService } from '../../../services/customer_service/customer-service.service';
import { CustomerDto } from '../models/Customer';
import { DeletePopupComponent } from "../../delete-popup/delete-popup.component";
import { CustomMessage } from '../../../utils/notification/CustomMessage';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateCustomerSchema } from '../models/UpdateCustomerSchema';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, DeletePopupComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  sortBy: string = "firstName";
  sortDirection: any;
  showFilters: boolean = false;
  customerToDelete: CustomerDto = new CustomerDto();
  showDeleteDialog: boolean = false;
  showUpdateDialog = false;
  updateForm: FormGroup;
  customerToUpdate: CustomerDto = new CustomerDto();
  searchTerm: string = "";

  customers: CustomerDto[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 1;
  isLoading: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private customerService: CustomerServiceService, private notificationService: NotificationService) {
    this.updateForm = this.fb.group({
      firstNameUpdate: [''],
      lastNameUpdate: [''],
      phoneNumberUpdate: ['', [Validators.pattern('^[0-9]{8}$')]]
    });
  }


  ngOnInit(): void {
    this.loadCustomers();
    this.customerService.totalPages$.subscribe((totalPages) => {
      this.totalPages = totalPages;
    });

  }

  get filteredCustomers() {
    if (!this.searchTerm) {
      return this.customers;
    }
    return this.customers.filter(customer =>
      `${customer.firstName} ${customer.lastName}`
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }
  changeSort(sortField: string) {
    if (this.sortBy === sortField) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortField;
      this.sortDirection = 'desc';
    }
    this.loadCustomers();
  }

  openDeleteDialog(customer: CustomerDto) {
    this.customerToDelete = customer;
    this.showDeleteDialog = true;
  }
  cancelDelete() {
    this.showDeleteDialog = false;
    this.customerToDelete = new CustomerDto();
  }

  confirmDelete() {
    if (this.customerToDelete?.id) {
      this.deleteCustomer(this.customerToDelete.id);
      this.showDeleteDialog = false;
      this.customerToDelete = new CustomerDto();

    }
  }

  deleteCustomer(customerId: number) {
    console.log(customerId);
    return this.customerService.deleteCustomer(customerId).subscribe((voie) => {
      this.loadCustomers();
      this.notificationService.notify(new CustomMessage('Suppression du client effectuée', 'info'));

    }, (error: HttpErrorResponse) => {
      this.notificationService.notify(new CustomMessage(error.error, 'error'));

    })
  }

  loadCustomers() {
    this.customerService.fetchCustomers(this.currentPage, this.pageSize, this.sortBy);
    this.customerService.getCustomers().subscribe(
      (data: CustomerDto[]) => {
        this.customers = data;
        this.customerService.totalPages$.subscribe(total => this.totalPages = total);      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (typeof error.error === 'object') {
          this.notificationService.notify(new CustomMessage('Erreur lors de la récupération', 'error'));
          return;
        } else {
          this.notificationService.notify(new CustomMessage(error.error, 'error'));

        }
      }
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
    this.openUpdateDialog(customer);
  }

  openUpdateDialog(customer: CustomerDto) {
    this.customerToUpdate = customer;
    this.updateForm.patchValue({
      firstNameUpdate: customer.firstName,
      lastNameUpdate: customer.lastName,
      phoneNumberUpdate: customer.phoneNumber
    });
    this.showUpdateDialog = true;
  }

  closeUpdateDialog() {
    this.showUpdateDialog = false;
    this.customerToUpdate = new CustomerDto();
  }

  confirmUpdate(customer: CustomerDto) {
    this.isLoading = true;
    if (this.updateForm.valid) {
      console.log("Update: ", this.updateForm.value)

      const updatedCustomer = {
        id: customer.id,
        firstName: this.updateForm.get('firstNameUpdate')?.value,
        lastName: this.updateForm.get('lastNameUpdate')?.value,
        phoneNumber: this.updateForm.get('phoneNumber')?.value
      };

      this.customerService.updateCustomer(new UpdateCustomerSchema(updatedCustomer.firstName, updatedCustomer.lastName, updatedCustomer.phoneNumber), updatedCustomer.id).subscribe({
        next: () => {
          this.showUpdateDialog = false;
          this.isLoading = false;
          this.notificationService.notify(new CustomMessage('Mise à jour effectuée', 'info'));
          this.loadCustomers();
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error('Error updating customer:', error);
          this.notificationService.notify(new CustomMessage('Erreur lors de la mise à jour', 'error'));
        }
      });
    }
  }

}
