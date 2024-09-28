import { RouterLink } from '@angular/router';
import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: any = [];
  ordersLength: any = 0;

  displayedOrders: any[] = [];
  totalPages: number = 0;
  page: number = 1;
  limit: number = 10;

  status: any = '';

  userId: any = '';

  confirm: any = 0;
  pending: any = 0;
  cancel: any = 0;

  constructor(private _ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  setSortBy(e: any) {
    this.status = e.target.value;
    this.page = 1;
    this.getAllOrders();
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
    this.displayedOrders = this.orders.slice(start, end);
  }

  getAllOrders() {
    this._ordersService.getAllOrders().subscribe({
      next: (res) => {
        this.ordersLength = res.allOrders.length;
        // this.userId = res.allOrders.userId._id;
        this.orders = res.allOrders.map((order: any) => {
          order.address = ` ${order.shippingDetails.city}, ${order.shippingDetails.postalCode} ${order.shippingDetails.address},${order.shippingDetails.comment}`;
          return order;
        });
        if (this.status) {
          this.orders = this.orders.filter(
            (order: any) => order.status === this.status
          );
          if (this.status === 'pending') {
            this.pending = this.orders;
          }
          if (this.status === 'confirm') {
            this.confirm = this.orders;
          }
          if (this.status === 'cancel') {
            this.cancel = this.orders;
          }
        }

        this.totalPages = Math.ceil(this.orders.length / this.limit);
        this.paginateOrders();
        // console.log(this.orders[0].userId._id);
      },
      error: (err) => {
        // console.log(err);
        // console.log('HERERE');
      },
    });
  }

  updateOrder(orderId: any, status: any) {
    this._ordersService.updateOrder(orderId, status).subscribe({
      next: (res) => {
        // console.log(status);
        console.log(res);
        console.log(this.orders);
        this.getAllOrders();
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
}
