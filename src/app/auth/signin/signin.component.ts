import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  isLoading: boolean = false
  constructor(private auth: AuthService,private router: Router){}
  onsubmit(form: NgForm) {
    // if (!form.valid) {
    //   return;
    // }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    this.auth.login(email,password).subscribe(response =>{
      console.log("==============>",response)
      this.isLoading = false;
      this.router.navigate(['/shops'])
    })
    // if(this.auth.login(email,password))
    //   {
    //     this.router.navigate(['/shops'])
    //   }
    // else{
    //   console.log('Invalid cred')
    // }
    // if (this.isLoginMode) {
    //   this.authObs = this.authService.login(email, password);
    // } else {
    //   this.authObs = this.authService.signup(email, password);
    // }
    // this.authObs.subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.isLoading = false;
    //     console.log('authObs.subscribe')
    //     this.router.navigate(['/recipes'])
    //   },
    //   (errorMessage) => {
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }
}
