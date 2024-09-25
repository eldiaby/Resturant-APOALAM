import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  category: Category[] = localStorage.getItem('categories')
    ? JSON.parse(localStorage.getItem('categories') as string)
    : [];
  constructor() {}
  addCategory(cate: Category) {
    this.category.push(cate);
    localStorage.setItem('categories', JSON.stringify(this.category));
  }
  deleteCategory(id: number) {
    this.category = this.category.filter((item) => item.id !== id);
    localStorage.setItem('categories', JSON.stringify(this.category));
  }
}
