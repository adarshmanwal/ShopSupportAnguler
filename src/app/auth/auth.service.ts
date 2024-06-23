import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './users/user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../shared/notification/notification.service';

export interface AuthResponseData {
  token: string;
  id: number;
  email: string;
  name: string;
  usertype: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private router: Router, private http: HttpClient,private notificationService: NotificationService) {}

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
        catchError(this.handleError),
        tap((resData) => {
          this.HandleAuthentication(
            resData.token,
            resData.id,
            resData.email,
            resData.name,
            resData.usertype
          );
          this.notificationService.showSuccess('Sign up successFull')
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
        catchError(this.handleError),
        tap((resData) => {
          this.HandleAuthentication(
            resData.token,
            resData.id,
            resData.email,
            resData.name,
            resData.usertype
          );
          this.notificationService.showSuccess('Login successFull')
        })
      );
  }

  private handleError(errorRes: any) {
    // Handle the error and provide feedback to the user
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error) {
      case 'Validation error':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'Invalid credentials':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }

  private HandleAuthentication(
    token: string,
    id: number,
    email: string,
    name: string,
    userType: number
  ) {
    const newuser = new User(id, email, name, userType);
    this.user.next(newuser);
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
