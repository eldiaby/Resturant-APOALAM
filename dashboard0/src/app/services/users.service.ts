import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  _httpClient = inject(HttpClient);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // private createHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token');
  //   let header = new HttpHeaders();
  //   if (token) {
  //     header = header.set('token', `${token}`);
  //   }
  //   return header;
  // }
  private createHeaders(): HttpHeaders {
    let header = new HttpHeaders();

    // Check if the code is running in the browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        header = header.set('token', `${token}`);
      }
    }

    return header;
  }
  getAllUsers(): Observable<any> {
    const headers = this.createHeaders();
    return this._httpClient.get('http://127.0.0.1:5000/api/users', { headers });
  }
  getUser(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this._httpClient.get(`http://127.0.0.1:5000/api/users/${id}`, {
      headers,
    });
  }
  addUser(data: any): Observable<any> {
    const headers = this.createHeaders();
    return this._httpClient.post(
      'http://127.0.0.1:5000/api/auth/register',
      data,
      { headers }
    );
  }
  deleteUser(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this._httpClient.delete(`http://127.0.0.1:5000/api/users/${id}`, {
      headers,
    });
  }
  updateUser(id: any, data: any): Observable<any> {
    const headers = this.createHeaders();
    return this._httpClient.post(
      `http://127.0.0.1:5000/api/users/${id}`,
      data,
      { headers }
    );
  }
}
