import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './users/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private users: { email: string, password: string, usertype: string }[] = [
    { email: 'adarsh@gmail.com', password: 'admin123', usertype: 'Admin' },
    { email: 'king@gmail.com', password: 'worker123', usertype: 'Shop worker' },
    { email: 'sing@gmail.com', password: 'customer123', usertype: 'Customer' }
  ];
  private currentusertype: string;

  constructor() {
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
      this.setcurrentUsertype(user.usertype);
      return true;
    }
    return false;
  }
}