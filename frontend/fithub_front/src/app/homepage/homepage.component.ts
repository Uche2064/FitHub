import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Views } from '../utils/view.enum';
import { SharedViewService } from '../services/shared-view.service';
import { CommonModule } from '@angular/common';
import { AddCustomerComponent } from './../add-client/add-customer.component';
@Component({
  selector: 'app-homepage',
  imports: [
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    CommonModule,
    AddCustomerComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  currentView: Views = Views.Dashboard;
  views = Views;
  constructor(private shareViewService: SharedViewService) {}
  ngOnInit(): void {
    this.shareViewService.viewObservable$.subscribe((view: Views) => {
      this.currentView = view;
    });
  }
}
