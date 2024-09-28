import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from './product-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public product: Product[]
  private userData: {
    email: string;
    name: string;
    id: string;
    token: string;
    usertype: string;
  } = { email: '', name: '', id: '', token: '', usertype: '' };
  private apiUrl = 'http://localhost:3000/shops';

  constructor(private http: HttpClient) {
    this.setUserData();
   }
  createProduct(product: FormData,shopId: number): Observable<Product> {
    const headers = this.getAuthHeaders();
    return this.http.post<Product>(`http://localhost:3000/shops/${shopId}/product/create`, product, { headers }).pipe(tap((resData)=>{
      this.product.push(resData)
    }));
  }

  private getAuthHeaders(): HttpHeaders {
    this.setUserData(); // Ensure userData is up-to-date
    return new HttpHeaders({
      Authorization: `Bearer ${this.userData.token}`,
      'Content-Type': 'application/json',
    });
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

  private setUserData(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
  }
}
