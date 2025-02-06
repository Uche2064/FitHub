import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: '', component: HomepageComponent, canActivate: [AuthGuard] },
];
