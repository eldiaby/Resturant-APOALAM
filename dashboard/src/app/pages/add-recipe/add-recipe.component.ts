import { Category } from './../../interfaces/category';
import { CategoryService } from './../../services/category.service';
import { RecipesService } from './../../services/recipes.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  router = inject(Router);
  message: string = '';
  showMessage: boolean = false;
  loading: boolean = false;
  ingredient: string = '';
  category: any = '';
  selectedFile: any = null;
  ingredients: string[] = [];

  constructor(
    private _recipesService: RecipesService,
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

  // addIngredient() {
  //   if (!this.ingredient) return;
  //   this.ingredients = [...this.ingredients, this.ingredient]; // Create a new array
  //   this.ingredient = '';
  //   this.addRecipeForm.patchValue({
  //     ingredients: [...this.ingredients], // Use a new array
  //   });
  // }

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
  addRecipe() {
    this.loading = true;
    // this.addRecipeForm.patchValue({
    //   // image: this.selectedFile,
    //   category: this.category,
    //   ingredients: this.ingredients,
    // });
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
    // formData.append(
    //   'ingredients',
    //   this.addRecipeForm.get('ingredients')?.value
    // );
    formData.append(
      'ingredients',
      JSON.stringify(this.addRecipeForm.get('ingredients')?.value)
    );
    // formData.append(
    //   'ingredients',
    //   JSON.stringify(this.addRecipeForm.get('ingredients')?.value)
    // );

    if (this.addRecipeForm.valid == false) {
      this.loading = false;
      this.showMessage = true;
      this.message = 'Check input values';
      setTimeout(() => {
        this.showMessage = false;
        this.message = '';
      }, 2000);
    } else {
      this.showMessage = true;
      this.message = 'Adding the item';
      setTimeout(() => {
        this.showMessage = false;
        this.message = '';
      }, 2000);
      this._recipesService.addRecipe(formData).subscribe({
        next: (res) => {
          this.loading = false;
          this.showMessage = true;
          this.message = 'Item added successfuly';
          setTimeout(() => {
            this.router.navigate(['/recipes']);
            this.showMessage = false;
            this.message = '';
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
          this.showMessage = true;
          this.message = err.message;
          setTimeout(() => {
            this.showMessage = false;
            this.message = '';
          }, 2000);
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
