import { Category } from './../../interfaces/category';
import { CategoryService } from './../../services/category.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-recipe',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './update-recipe.component.html',
  styleUrl: './update-recipe.component.css',
})
export class UpdateRecipeComponent implements OnInit {
  // ingredient: string = '';
  // ingredients: string[] = [];
  // editIngredient() {
  //   if (!this.ingredient) return;
  //   this.ingredients.push(this.ingredient);
  //   this.ingredient = '';
  // }
  // deleteIngredient(i: any) {
  //   if (i > -1) {
  //     this.ingredients.splice(i, 1);
  //   }
  // }
  router = inject(Router);
  loading: boolean = false;
  ingredient: string = '';
  category: any = '';
  selectedFile: any = null;
  ingredients: string[] = [];
  recipeId: string = '';

  message: string = '';
  showMessage: boolean = false;

  constructor(
    private _recipesService: RecipesService,
    private route: ActivatedRoute,
    private _categoryService: CategoryService
  ) {}
  categories: Category[] = this._categoryService.category;
  addIngredient() {
    if (!this.ingredient) return;
    this.ingredients.push(this.ingredient);
    this.ingredient = '';
    this.addRecipeForm.patchValue({
      ingredients: this.ingredients,
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeId = params['id'];
      this.updateRecipe(this.recipeId);
    });
  }

  deleteIngredient(i: any) {
    if (i > -1) {
      this.ingredients.splice(i, 1);
    }
  }
  setCategory(event: any) {
    this.category = event.target.value;
    this.addRecipeForm.patchValue({
      category: this.category,
    });
  }
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.addRecipeForm.patchValue({
        image: file,
      });
    }
  }

  updateRecipe(id: any) {
    this._recipesService.getRecipe(id).subscribe({
      next: (res) => {
        // Assuming res contains the recipe data you need
        this.ingredients = JSON.parse(res.ingredients[0]);

        // Set the form values based on the fetched recipe details
        this.addRecipeForm.patchValue({
          name: res.name,
          description: res.description,
          category: res.category,
          price: res.price,
          estimatedTime: res.estimatedTime,
          imageUrl: res.image,
          ingredients: this.ingredients,
        });
      },
      error: (err) => {
        console.error('Error fetching recipe details', err);
      },
    });
  }
  addRecipe() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    formData.append('name', this.addRecipeForm.get('name')?.value);
    formData.append(
      'description',
      this.addRecipeForm.get('description')?.value
    );
    formData.append('category', this.addRecipeForm.get('category')?.value);
    formData.append('price', this.addRecipeForm.get('price')?.value);
    formData.append(
      'estimatedTime',
      this.addRecipeForm.get('estimatedTime')?.value
    );
    formData.append(
      'ingredients',
      JSON.stringify(this.addRecipeForm.get('ingredients')?.value)
    );

    this.loading = true;
    if (this.addRecipeForm.valid == false) {
      this.showMessage = true;
      this.message = 'Check input values';
      setTimeout(() => {
        this.showMessage = false;
        this.message = '';
      }, 2000);
      this.loading = false;
    } else {
      this.showMessage = true;
      this.message = 'Updading the item';
      setTimeout(() => {
        this.showMessage = false;
        this.message = '';
      }, 2000);
      this._recipesService.updateRecipe(this.recipeId, formData).subscribe({
        next: (res) => {
          this.loading = false;
          this.showMessage = true;
          this.message = 'Item updated successfuly';
          setTimeout(() => {
            this.router.navigate(['/recipes']);
            this.showMessage = false;
            this.message = '';
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
        },
      });
    }
  }

  addRecipeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    ingredients: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    estimatedTime: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
}
