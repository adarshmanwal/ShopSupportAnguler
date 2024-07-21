import { Injectable } from '@angular/core';
import { Shop } from './shop-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  public shops: Shop[] = [];
  shopUpdated = new Subject();
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

  private getAuthHeaders(): HttpHeaders {
    this.setUserData(); // Ensure userData is up-to-date
    return new HttpHeaders({
      Authorization: `Bearer ${this.userData.token}`,
      'Content-Type': 'application/json',
    });
  }

  updateShop(shop: Shop): Observable<Shop> {
    const headers = this.getAuthHeaders();
    return this.http.put<Shop>(`${this.apiUrl}/${shop.id}`, shop, { headers });
  }

  deleteShop(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getAllShops(): Observable<Shop[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Shop[]>(this.apiUrl, { headers }).pipe(
      tap((resData) => {
        this.shops = resData;
      })
    );
  }

  getShopById(id: number): Observable<Shop> {
    const headers = this.getAuthHeaders();
    return this.http.get<Shop>(`${this.apiUrl}/${id}`, { headers });
  }

  createShop(shop: FormData): Observable<Shop> {
    const headers = this.getAuthHeaders();
    return this.http.post<Shop>(this.apiUrl, shop, { headers }).pipe(tap((resData)=>{
      this.shops.push(resData)
    }));
  }

  uploadFiles(formData: FormData): Observable<string[]> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.userData.token}`
      }),
    };
  
    return this.http.post<string[]>(
      `${this.apiUrl}/upload`,
      formData,
      HttpUploadOptions
    );
  }
}
