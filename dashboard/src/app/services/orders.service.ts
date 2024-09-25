import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  _httpClient = inject(HttpClient);
  constructor() {}

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let header = new HttpHeaders();
    if (token) {
      header = header.set('token', `${token}`);
    }
    return header;
  }

  getAllOrders(): Observable<any> {
    const headers = this.createHeaders();
    return this._httpClient.get('http://127.0.0.1:5000/api/order', {
      headers,
    });
  }
  cancelOrder(orderId: any, userId: any): Observable<any> {
    const body = { userId };
    const headers = this.createHeaders();
    return this._httpClient.delete(
      `http://127.0.0.1:5000/api/order/${orderId}`,
      {
        headers,
        body,
      }
    );
  }
}
