import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit{
  isLoading: boolean = false;
  signinForm: FormGroup
  constructor(
    private auth: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null,[Validators.required])
    })
  }
  onsubmit() {
    this.isLoading = true;
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    this.auth.login(email, password).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/shops']);
      },
      (error) => {
        this.notificationService.showError(error);
        this.isLoading = false;
      }
    );
  }
}
