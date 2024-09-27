import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
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

  getAllReservations(): Observable<any> {
    const headers = this.createHeaders();
    return this._httpClient.get('http://127.0.0.1:5000/api/reservations', {
      headers,
    });
  }
  updateReservations(reservationId: any, status: any): Observable<any> {
    const body = { status };
    const headers = this.createHeaders();
    return this._httpClient.patch(
      `http://127.0.0.1:5000/api/reservations/${reservationId}`,
      body,
      {
        headers,
      }
    );
  }
}
