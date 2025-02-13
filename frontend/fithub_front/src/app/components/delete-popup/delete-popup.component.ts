import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationComponent } from "../../utils/notification/notification.component";

@Component({
  selector: 'app-delete-popup',
  imports: [CommonModule],
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.css'
})
export class DeletePopupComponent {
  @Input() isVisible: boolean = false;
  @Input() title: string = 'Confirmer la suppression';
  @Input() message: string = 'Are you sure you want to delete this item?';
  @Input() confirmButtonText: string = 'Delete';
  @Input() cancelButtonText: string = 'Cancel';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

}
