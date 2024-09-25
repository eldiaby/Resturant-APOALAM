import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  _httpClient = inject(HttpClient);
  constructor() {}

  getAllRecipes(page: number, category?: string): Observable<any> {
    let params = new HttpParams().set('page', page.toString());
    if (category) {
      params = params.set('category', category);
    }
    return this._httpClient.get('http://127.0.0.1:5000/api/meals', { params });
  }
  getRecipe(id: any): Observable<any> {
    return this._httpClient.get(`http://127.0.0.1:5000/api/meals/${id}`);
  }
  deleteRecipe(id: any): Observable<any> {
    return this._httpClient.delete(`http://127.0.0.1:5000/api/meals/${id}`);
  }
  addRecipe(data: any): Observable<any> {
    return this._httpClient.post('http://127.0.0.1:5000/api/meals', data);
  }
  updateRecipe(id: any, data: any): Observable<any> {
    return this._httpClient.put(`http://127.0.0.1:5000/api/meals/${id}`, data);
  }
}
