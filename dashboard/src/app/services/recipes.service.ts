import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  _httpClient = inject(HttpClient);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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

  getAllRecipes(
    page: number,
    category?: string,
    sortBy?: string
  ): Observable<any> {
    const headers = this.createHeaders();
    let params = new HttpParams().set('page', page.toString());
    if (category) {
      params = params.set('category', category);
    }
    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }
    return this._httpClient.get('http://127.0.0.1:5000/api/meals', {
      params,
      headers,
    });
  }
  getRecipe(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this._httpClient.get(`http://127.0.0.1:5000/api/meals/${id}`, {
      headers,
    });
  }

  deleteRecipe(id: any): Observable<any> {
    const headers = this.createHeaders();
    return this._httpClient.delete(`http://127.0.0.1:5000/api/meals/${id}`, {
      headers,
    });
  }
  addRecipe(data: any): Observable<any> {
    const headers = this.createHeaders();
    return this._httpClient.post('http://127.0.0.1:5000/api/meals', data, {
      headers,
    });
  }
  updateRecipe(id: any, data: any): Observable<any> {
    const headers = this.createHeaders();
    return this._httpClient.put(`http://127.0.0.1:5000/api/meals/${id}`, data, {
      headers,
    });
  }
}
