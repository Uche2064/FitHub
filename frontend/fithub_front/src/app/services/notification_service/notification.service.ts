import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomMessage } from '../../utils/notification/CustomMessage';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}
  private notificationSubject = new Subject<CustomMessage>();
  notification$ = this.notificationSubject.asObservable();

  notify(message: CustomMessage) {
    this.notificationSubject.next(message);
  }
}
