import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/users/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  user: any = null
  isDropdownOpen = false;
  constructor(private router: Router,private auth: AuthService){}
  ngOnInit(): void {
      this.auth.user.subscribe(user =>{
        this.isAuthenticated = !!user;
        this.user = user
        console.log(user)
        console.log(this.isAuthenticated)
      })
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onclicktologin(){
    this.router.navigate(['/auth'])
  }
  onclicktologout(){
    this.user = null
    this.auth.logout()
    this.router.navigate(['/auth'])
  }
}
