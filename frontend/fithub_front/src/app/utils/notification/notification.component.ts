import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification_service/notification.service';
import { CommonModule } from '@angular/common';
import { CustomMessage } from './CustomMessage';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  message: CustomMessage = new CustomMessage(null, null);

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notification$.subscribe((msg) => {
      this.message.content = msg.content;
      this.message.type = msg.type;
      setTimeout(() => {
        this.message = new CustomMessage(null, null);
      }, 3000);
    });
  }
}
