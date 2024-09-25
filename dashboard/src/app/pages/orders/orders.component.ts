import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: any = [];

  displayedUsers: any[] = [];
  totalPages: number = 0;
  page: number = 1;
  limit: number = 10;

  status: any = '';

  userId: any = '';

  constructor(private _ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  setStatus(e: any) {
    console.log(e.target.value);
  }
  setPage(num: number) {
    if (num >= 1 && num <= this.totalPages) {
      this.page = num;
      this.paginateOrders();
    }
  }

  next() {
    if (this.page < this.totalPages) {
      this.page++;
      this.paginateOrders();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.paginateOrders();
    }
  }

  paginateOrders() {
    const start = (this.page - 1) * this.limit;
    const end = start + this.limit;
    this.displayedUsers = this.orders.slice(start, end);
  }

  getAllOrders() {
    this._ordersService.getAllOrders().subscribe({
      next: (res) => {
        // console.log(res.allOrders);
        // this.userId = res.allOrders.userId._id;
        this.orders = res.allOrders.map((order: any) => {
          order.address = ` ${order.shippingDetails.city}, ${order.shippingDetails.postalCode} ${order.shippingDetails.address},${order.shippingDetails.comment}`;
          return order;
        });
        this.totalPages = Math.ceil(this.orders.length / this.limit);
        this.paginateOrders();
        // console.log(this.orders[0].userId._id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  cancelOrder(orderId: any, userId: any) {
    this._ordersService.cancelOrder(orderId, userId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
