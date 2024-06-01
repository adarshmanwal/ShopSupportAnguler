import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap } from 'rxjs';
import { User } from './users/user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface AuthResponseData {
  token: string;
  id: number;
  email: string;
  name: string;
  usertype: number;
  // refreshToken: string;
  // expiresIn: string;
  // localId: string;
  // registered?: string;
}

interface UserData {
  email: string;
  id: number;
  name: string;
  token: string;
  userType: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private users: {
    id: number;
    name: string;
    email: string;
    password: string;
    usertype: string;
  }[] = [
    {
      id: 1,
      name: 'adarsh',
      email: 'adarsh@gmail.com',
      password: 'admin123',
      usertype: 'Admin',
    },
    {
      id: 2,
      name: 'adarsh',
      email: 'king@gmail.com',
      password: 'worker123',
      usertype: 'Shop worker',
    },
    {
      id: 3,
      name: 'adarsh',
      email: 'sing@gmail.com',
      password: 'customer123',
      usertype: 'Customer',
    },
  ];
  private currentusertype: string;

  constructor(private router: Router, private http: HttpClient) {
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
  autoLogin() {
    const userData: {
      email: string;
      name: string;
      id: string;
      token: string;
      usertype: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      parseInt(userData.id),
      userData.email,
      userData.name,
      parseInt(userData.usertype)
    );
    if (userData.token) {
      this.user.next(loadedUser);
    }
  }

  signup(name: string, email: string, password: string, usertype?: number) {
    return this.http
      .post<AuthResponseData>('http://localhost:3000/users/register', {
        name: name,
        email: email,
        password: password,
      })
      .pipe(
        // catchError(this.handleError),
        tap((resData) => {
          console.log('==================>', resData);
          this.HandleAuthentication(
            resData.token,
            resData.id,
            resData.email,
            resData.name,
            resData.usertype
          );
          // const newuser = new User(user.id, user.email, user.name, user.userType);
        })
      );
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:3000/users/login', {
        email: email,
        password: password,
      })
      .pipe(
        // catchError(this.handleError),
        tap((resData) => {
          this.HandleAuthentication(
            resData.token,
            resData.id,
            resData.email,
            resData.name,
            resData.usertype
          );
          // const newuser = new User(user.id, user.email, user.name, user.userType);
        })
      );
  }
  // private handleError(errorResponse: HttpErrorResponse) {
  //   console.log(errorResponse);
  //   let errormessage = 'An error occured!';
  //   if (!errorResponse.error || !errorResponse.error.error) {
  //     return throwError(errormessage);
  //   }
  //   switch (errorResponse.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errormessage = 'This email exisits already';
  //     case 'INVALID_LOGIN_CREDENTIALS':
  //       errormessage = 'INVALID_PASSWORD';
  //     case 'EMAIL_NOT_FOUND':
  //       errormessage = 'EMAIL_NOT_FOUND';
  //   }
  //   return throwError(errormessage);
  // }

  private HandleAuthentication(
    token: string,
    id: number,
    email: string,
    name: string,
    userType: number
  ) {
    // const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const newuser = new User(id, email, name, userType);
    this.user.next(newuser);
    // this.autoLogout(parseInt(expiresIn) * 1000);
    const userData = {
      ...newuser,
      token: token,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }
}
