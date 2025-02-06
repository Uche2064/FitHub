import { Component } from '@angular/core';
import { SharedViewService } from '../../services/shared_view/shared-view.service';
import { Views } from '../../utils/view.enum';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  views = Views; // Rendre l'enum accessible dans le template

  constructor(private shareStateService: SharedViewService) {} // Instancier le services

  changeView(view: Views): void {
    this.shareStateService.changeView(view);
  }
}
