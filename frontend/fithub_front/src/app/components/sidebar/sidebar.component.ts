import { Component } from '@angular/core';
import { SharedViewService } from '../../services/shared_view/shared-view.service';
import { Views } from '../../utils/view.enum';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowAltCircleDown,
  faArrowAltCircleRight,
  faArrowLeft,
  faBell,
  faBox,
  faCaretDown,
  faCaretRight,
  faDashboard,
  faGear,
  faGrip,
  faMoon,
  faPerson,
  faSun,
  faTh,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !JSON.parse(localStorage.getItem('isDarkMode')!);
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
    document.body.classList.toggle('dark', this.isDarkMode);
  }
  views = Views;
  logo: string = 'FH.png';
  faMoon = faMoon;
  faSun = faSun;
  faClient = faUser;
  faArrowDown = faCaretRight;
  faDashboard = faGrip;
  faDumbell = faBox;
  faBell = faBell;
  faParametre = faGear;
  selectedMenu: string | null = null;
  constructor(private shareStateService: SharedViewService) { }

  activateTab: number = 0;


  changeView(view: Views): void {
    this.shareStateService.changeView(view);
  }

  toggleMenu(menu: string) {
    this.selectedMenu = this.selectedMenu === menu ? null : menu;
  }

}
