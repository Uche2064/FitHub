import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PackComponent } from './components/pack/pack.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { CustomerComponent } from './components/customer/customer.component';

export const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'offre', component: PackComponent },
      { path: 'souscription', component: SubscriptionComponent },
      { path: 'client', component: CustomerComponent }
    ]
  },
  { path: '**', redirectTo: '/homepage' }
];
