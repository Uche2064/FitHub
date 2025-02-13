import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { SharedViewService } from '../../services/shared_view/shared-view.service';
import { Views } from '../../utils/view.enum';
import { CustomerComponent } from '../customer/customer.component';
import { PackComponent } from '../pack/pack.component';
import { SubscriptionComponent } from "../subscription/subscription.component";
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from "../../utils/notification/notification.component";
@Component({
  selector: 'app-homepage',
  imports: [
    SidebarComponent,
    NavbarComponent,
    CommonModule,
    RouterOutlet,
    NotificationComponent
],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  views = Views;
  constructor(private shareViewService: SharedViewService) { }
  ngOnInit(): void {

  }
}
