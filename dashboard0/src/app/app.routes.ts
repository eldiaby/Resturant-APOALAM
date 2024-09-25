import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SigninComponent } from './pages/signin/signin.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { UpdateRecipeComponent } from './pages/update-recipe/update-recipe.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { CategoryComponent } from './pages/category/category.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/add', component: AddRecipeComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent },
  { path: 'recipes/update/:id', component: UpdateRecipeComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'users', component: CustomerComponent },
  { path: 'users/add', component: AddUserComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'category', component: CategoryComponent },
];
