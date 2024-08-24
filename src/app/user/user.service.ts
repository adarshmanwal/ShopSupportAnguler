import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../auth/users/user.model';
import { HttpHeaders,HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private userData: {
    email: string;
    name: string;
    id: string;
    token: string;
    usertype: string;
  } = { email: '', name: '', id: '', token: '', usertype: '' };
  constructor(private http: HttpClient) { 
    this.setUserData(); // Initialize userData on service creation
  }
  private setUserData(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
  }
  private getAuthHeaders(): HttpHeaders {
    this.setUserData(); // Ensure userData is up-to-date
    return new HttpHeaders({
      Authorization: `Bearer ${this.userData.token}`,
      'Content-Type': 'application/json',
    });
  }

  getUserData(): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(this.apiUrl +"/profile", { headers }).pipe(
      tap((resData) => {
      })
    );
  }

  deleteUser(){
    const headers = this.getAuthHeaders();
    return this.http.delete(this.apiUrl+"/delete",{headers})
  }
  
}
