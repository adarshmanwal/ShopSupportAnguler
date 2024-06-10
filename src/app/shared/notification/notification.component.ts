import { Component, OnInit } from '@angular/core';
import { NotificationService,Notification } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  notifications: Notification[]  = []

  constructor(private notificationService: NotificationService ){
  }
  ngOnInit(): void {
    this.notificationService.notificationSubject.subscribe(notification => {
      if(notification){
        this.notifications.push(notification);
        setTimeout(() => {
          this.notifications = this.notifications.filter(n => n !== notification);
        }, 3000); // Display for 3 seconds
      }
    });
  }
}
