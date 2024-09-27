import { CategoryService } from './../../services/category.service';
import { Category } from './../../interfaces/category';
import { RecipesService } from './../../services/recipes.service';
import { AfterContentInit, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Recipe } from '../../interfaces/recipe-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit {
  categories: Category[] = [];
  router = inject(Router);
  recipes: Recipe[] = [];
  totalRecipes: any = 0;
  ingredients: string[] = [];
  sortByCate: string = '';
  sortByNamePrice: string = '';
  page: number = 1;
  fetchOne: boolean = false;
  searchQuery: string = '';

  curPage: number | null = null;
  totPages: number | null = null;
  pagesNum: number[] = [];

  deleMessage: any = false;
  deleteDone: boolean = false;
  tempId: any = '';

  constructor(
    private _recipesService: RecipesService,
    private _categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.fetchRecipes(this.page, '', '');
    this.categories = this._categoryService.category;
  }
  search(x: any) {
    this.searchQuery = x.target.value;
    if (this.searchQuery) {
      this.recipes = this.recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fetchRecipes(this.page, '', '');
    }
  }
  setSortByCate(e: any) {
    this.sortByCate = e.target.value;
    this.fetchRecipes(this.page, e.target.value, '');
  }
  setSortByNamePrice(e: any) {
    this.sortByNamePrice = e.target.value;
    this.fetchRecipes(this.page, '', e.target.value);
  }

  setPage(num: number) {
    this.page = num;
    this.fetchRecipes(this.page, '', '');
  }

  next() {
    this.page++;
    this.fetchRecipes(this.page, '', '');
  }
  prev() {
    this.page--;
    this.fetchRecipes(this.page, '', '');
  }
  fetchRecipes(page: number, category: string, sortBy: string) {
    this._recipesService.getAllRecipes(page, category, sortBy).subscribe({
      next: (res) => {
        this.totalRecipes = res.results;
        this.curPage = res.currentPage;
        this.totPages = res.totalPages;
        if (!this.fetchOne) {
          for (let i = 0; i < res.totalPages; i++) {
            this.pagesNum.push(i + 1);
          }
        }
        this.fetchOne = true;
        this.recipes = res.meals.map((meal: any) => {
          meal.ingredients = JSON.parse(meal.ingredients);

          // if (typeof meal.ingredients === 'string') {
          //     meal.ingredients = JSON.parse(meal.ingredients);
          //   try {
          //   } catch (error) {
          //     console.error('Error parsing ingredients:', error);
          //   }
          // }
          return meal;
        });
      },
      error: (err) => {},
    });
  }

  deleteItem(id: any) {
    this.deleMessage = true;
    this.tempId = id;
  }
  closeMaessage() {
    this.deleMessage = false;
  }
  deleteConfirm() {
    this.deleteRecipeById(this.tempId);
    this.recipes = this.recipes.filter((recipe) => recipe._id !== this.tempId);
    this.deleMessage = false;
    this.tempId = '';
    this.deleteDone = true;
    setTimeout(() => {
      this.deleteDone = false;
    }, 2000);
  }

  deleteRecipeById(id: any) {
    this._recipesService.deleteRecipe(id).subscribe({
      next: (res) => {
        this.router.navigate(['/recipes']);
      },
      error: (err) => {},
    });
  }
}
