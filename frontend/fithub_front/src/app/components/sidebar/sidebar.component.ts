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
  faPerson,
  faTh,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  views = Views; // Rendre l'enum accessible dans le template
  logo: string = 'FH.png';
  faHome = faArrowLeft;
  faClient = faUser;
  faArrowDown = faCaretRight;
  faDashboard = faGrip;
  faDumbell = faBox;
  faBell = faBell;
  faParametre = faGear;
  selectedMenu: string | null = null;
  constructor(private shareStateService: SharedViewService) {} // Instancier le services

  activateTab: number = 0;

  changeView(view: Views): void {
    this.shareStateService.changeView(view);
  }

  toggleMenu(menu: string) {
    this.selectedMenu = this.selectedMenu === menu ? null : menu;
  }

}
