import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './users/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User| null>(null);
  private users: { id: number,name: string,email: string, password: string, usertype: string }[] = [
    { id: 1,name: 'adarsh',email: 'adarsh@gmail.com', password: 'admin123', usertype: 'Admin' },
    { id: 2,name: 'adarsh',email: 'king@gmail.com', password: 'worker123', usertype: 'Shop worker' },
    { id: 3,name: 'adarsh',email: 'sing@gmail.com', password: 'customer123', usertype: 'Customer' }
  ];
  private currentusertype: string;

  constructor(private router: Router) {
    this.currentusertype = '';
  }

  setcurrentUsertype(usertype: string): string {
    this.currentusertype = usertype;
    return this.currentusertype;
  }

  getcurrentUsertype(): string {
    console.log(this.currentusertype);
    return this.currentusertype;
  }
  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      let currentuser: User = { id: user.id,name: user.name,email: user.email, userType: user.usertype }
      this.setcurrentUsertype(user.usertype);
      this.user.next(currentuser)
      return true;
    }
    return false;
  }
  
  logout() {
    console.log('logout of AuthService');
    this.user.next(null);
    console.log('logout of AuthService second');
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    // if (this.tokenExpirationTimer) {
    //   clearTimeout(this.tokenExpirationTimer);
    // }
    // this.tokenExpirationTimer = null;
  }
}