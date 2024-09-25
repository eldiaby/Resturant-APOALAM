import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _httpClient = inject(HttpClient);
  constructor() {}
  signIn(data: any): Observable<any> {
    return this._httpClient.post('http://127.0.0.1:5000/api/auth/login', data);
  }
  logout() {
    localStorage.removeItem('token');
  }
}
