import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Recipe } from '../../interfaces/recipe-interface';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  router = inject(Router);
  recipe: Recipe = {} as Recipe;
  recipeId: string = '';
  ingredients: string[] = [];
  deleMessage: boolean = false;
  constructor(
    private _recipesService: RecipesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeId = params['id'];
      this.fetchRecipeDetails(this.recipeId);
    });
  }

  fetchRecipeDetails(id: any) {
    this._recipesService.getRecipe(id).subscribe({
      next: (res) => {
        this.recipe = res;
        this.ingredients = JSON.parse(res.ingredients[0]);
      },
      error: (err) => {},
    });
  }

  deleteRecipeById(id: any) {
    this._recipesService.deleteRecipe(id).subscribe({
      next: (res) => {
        this.router.navigate(['/recipes']);
      },
      error: (err) => {},
    });
  }
  showDelete() {
    this.deleMessage = true;
  }
  deleteConfirm() {
    this.deleteRecipeById(this.recipeId);
    this.deleMessage = false;
  }
  closeMaessage() {
    this.deleMessage = false;
  }
}
