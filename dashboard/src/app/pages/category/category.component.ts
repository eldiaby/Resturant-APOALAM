import { FormsModule } from '@angular/forms';
import { Category } from './../../interfaces/category';
import { CategoryService } from './../../services/category.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  cateName: string = '';
  constructor(private _categoryService: CategoryService) {}
  category: Category[] = this._categoryService.category;
  addCate() {
    const id = Math.floor(Math.random() * 1000000000);
    const cate = {
      id,
      name: this.cateName,
    };
    this._categoryService.addCategory(cate);
    this.cateName = '';
  }
  // deleteCate(id: number) {
  //   this.category.filter((ele) => ele.id !== id);
  //   this._categoryService.deleteCategory(id);
  //   console.log('Clicked');
  //   console.log(this._categoryService.category);
  // }
  deleteCate(id: number) {
    this.category = this.category.filter((ele) => ele.id !== id);
    this._categoryService.deleteCategory(id);
  }
}
