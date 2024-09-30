import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit {
  order: any = {};
  orderId: any = '';
  constructor(
    private _ordersService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
    });
    this.getOrder(this.orderId);
  }
  getOrder(id: any) {
    this._ordersService.getOrder(id).subscribe({
      next: (res) => {
        console.log(res.order);
        this.order = res.order;
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }

  updateOrder(orderId: any, status: any) {
    this._ordersService.updateOrder(orderId, status).subscribe({
      next: (res) => {
        // console.log(status);
        // console.log(res);
        // console.log(this.orders);
        this.getOrder(orderId);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
}
