import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth_service/auth.service';
import { AuthCheckSchema } from './global_model/AuthCheckSchema';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  access_token: string | null;
  currentUser: string | null;

  constructor(private router: Router, private autheService: AuthService) {
    this.access_token = localStorage.getItem('access_token');
    this.currentUser = localStorage.getItem('currentUser');
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('currentUser'));
    if (this.access_token == null || this.currentUser == null) {
      this.autheService.logout();
      return;
    }
  }
}
