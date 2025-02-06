import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Views } from '../utils/view.enum';
import { SharedViewService } from '../services/shared-view.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
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
