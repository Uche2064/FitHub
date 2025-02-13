import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionDto } from '../subscription/models/SubscriptionDto';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartType, ChartOptions } from 'chart.js';
import { NotificationService } from '../../services/notification_service/notification.service';
import { CustomMessage } from '../../utils/notification/CustomMessage';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  subscriptions: SubscriptionDto[] = [];
  totalActiveClients: number = 0;
  monthlyRevenue: number = 0;
  dateForm: FormGroup;
  public lineChartData: Array<any> = [
    { data: [], label: 'Chiffre d\'affaires' },
  ];
  public lineChartLabels: Array<any> = []; // Labels for the x-axis
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  isLoading: boolean = false;

  fetchStatistics() {
    // Simulate fetching data; replace with your service call
    const statistics = [
      { month: 'January', revenue: 1000 },
      { month: 'February', revenue: 1500 },
      { month: 'March', revenue: 2000 },
      // Add more data as needed
    ];

    this.lineChartLabels = statistics.map(stat => stat.month);
    this.lineChartData[0].data = statistics.map(stat => stat.revenue);
  }
  constructor(private subscriptionService: SubscriptionService, private fb: FormBuilder, private notificationService: NotificationService) {
    this.dateForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });
    this.fetchStatistics();
  }
  ngOnInit() {
    this.fetchSubscriptions();
  }

  fetchSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe((data) => {
      this.subscriptions = data.map(sub => ({
        ...sub,
        startDate: new Date(sub.startDate)
      })); console.log(data)
      this.calculateActiveClients();

      this.calculateMonthlyRevenue()

    });
  }

  calculateActiveClients() {
    this.totalActiveClients = this.subscriptions.filter(sub => sub.active).length;
  }

  calculateMonthlyRevenue() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    this.monthlyRevenue = this.subscriptions
      .filter(sub => sub.active && sub.startDate.getMonth() === currentMonth && sub.startDate.getFullYear() === currentYear)
      .reduce((acc, sub) => acc + sub.pack.monthlyPrice, 0);
  }



  exportSubscriptions(startDate: string, endDate: string) {
    this.isLoading = true;
    this.subscriptionService.getSubscriptions().subscribe(subscriptions => {
      const processedSubscriptions = subscriptions.map(sub => ({
        ...sub,
        startDate: new Date(sub.startDate), // Assurez-vous que startDate est un objet Date
        endDate: new Date(sub.endDate) // Ajouter endDate si nécessaire
      }));

      // Filtrer selon le statut actif et la plage de dates
      const filteredSubscriptions = processedSubscriptions.filter(sub =>
        sub.active &&
        sub.startDate >= new Date(startDate) &&
        sub.startDate <= new Date(endDate)
      );

      if (filteredSubscriptions.length > 0) {
        this.downloadCSV(filteredSubscriptions);
        this.isLoading = false;
      } else {
        this.isLoading = false;

        this.notificationService.notify(new CustomMessage("Il n'y a pas de souscriptions active entre la période sélectionnée", 'info'));
        console.error('No active subscriptions found for the selected date range.');
      }
    });
  }

  convertToCSV(data: SubscriptionDto[]) {
    const header = ['ID', 'Client', 'Offre', 'Date debut', 'Date de fin', 'Statut'];
    const rows = data.map(sub => [
      sub.id,
      `${sub.customer.firstName} ${sub.customer.lastName}`,
      sub.pack.offerName,
      sub.startDate,
      sub.endDate,
      sub.active ? 'Actif' : 'Inactif'
    ]);

    return [header, ...rows];
  }

  downloadCSV(subscriptions: SubscriptionDto[]) {
    if (!subscriptions || subscriptions.length === 0) {
      console.error('No subscriptions available for export.');
      return;
    }

    const csvData = this.convertToCSV(subscriptions);
    const worksheet = XLSX.utils.aoa_to_sheet(csvData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscriptions');

    // Générer le fichier Excel
    XLSX.writeFile(workbook, 'subscriptions.xlsx');
  }
}
