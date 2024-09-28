import { OrdersService } from './../../services/orders.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Charts } from '../../components/charts/charts.component';
import { MyChartComponent } from '../../components/chart2/chart2.component';
import { ChartsComponent } from '../../components/chart3/chart3.component';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Charts, MyChartComponent, ChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  users: any = [];
  recipesLength: any = [];
  orders: any = [];
  totalRevenue: number | any = 0;

  constructor(
    private _usersService: UsersService,
    private _recipesService: RecipesService,
    private _ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.fetchRecipes(1, '');
    this.getAllOrders();
  }
  getTotalRevenue() {
    this.totalRevenue = this.orders.reduce((acc: number, cur: any) => {
      return Number(acc) + Number(cur.totalPrice);
    }, 0);
  }
  getAllUsers() {
    this._usersService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.allUsers;
        this.fetchRecipes(1, '');
      },
      error: (err) => {},
    });
  }
  fetchRecipes(page: number, category: string) {
    this._recipesService.getAllRecipes(page, category).subscribe({
      next: (res) => {
        this.recipesLength = res.results;
      },
      error: (err) => {},
    });
  }

  getAllOrders() {
    this._ordersService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.allOrders;
        this.getTotalRevenue();
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
}
