import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  isLoading: boolean = false;
  constructor(private auth: AuthService, private router: Router,private notificationService: NotificationService) {}
  onsubmit(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const name = form.value.email;
    const password = form.value.password;
    this.auth.signup(name, email, password).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/shops']);
      },
      (error) => {
        this.notificationService.showError(error);
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
