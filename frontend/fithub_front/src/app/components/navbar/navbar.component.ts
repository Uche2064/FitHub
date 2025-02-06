import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
logout() {
  localStorage.removeItem('token');
  window.location.reload();
}
  isHidden: boolean = true;

  toggleUserOption() {
    this.isHidden = !this.isHidden;
  }
}
