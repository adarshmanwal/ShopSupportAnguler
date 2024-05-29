import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  constructor(private router: Router,private auth: AuthService){}
  ngOnInit(): void {
      this.auth.user.subscribe(user =>{
        this.isAuthenticated = !!user;
        console.log(user)
        console.log(this.isAuthenticated)

      })
  }
  onclicktologin(){
    this.router.navigate(['/auth'])
  }
  onclicktologout(){
    this.auth.logout()
    this.router.navigate(['/auth'])
  }
}
