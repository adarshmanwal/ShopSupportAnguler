import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Notification {
  type: 'success' | 'error';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationSubject = new Subject<Notification>();
  // notifications$ = this.notificationSubject.asObservable();

  showSuccess(message: string) {
    this.notificationSubject.next({ type: 'success', message });
  }

  showError(message: string) {
    this.notificationSubject.next({ type: 'error', message });
  }
}
