import { Injectable } from '@angular/core';
import { Shop } from './shop-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private shop: Shop[] = [];
  private apiUrl = 'http://localhost:3000/shops';
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

  getAllShops(): Observable<Shop[]> {
    this.setUserData(); // Ensure userData is up-to-date

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userData.token}`, // Include the token in the Authorization header
    });

    return this.http.get<Shop[]>(this.apiUrl, { headers }).pipe(
      tap((resData) => {
        this.shop = resData;
      })
    );
  }

  createShop(shop: Shop): Observable<Shop> {
    this.setUserData(); // Ensure userData is up-to-date

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userData.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<Shop>(this.apiUrl, shop, { headers });
  }
}
