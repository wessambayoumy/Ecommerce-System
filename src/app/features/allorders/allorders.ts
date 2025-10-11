import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { IOrders } from '../../core/Interfaces/iorders';
import { CartService } from '../../core/services/cart-service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.html',
  styleUrl: './allorders.css',
})
export class Allorders implements OnInit {
  private readonly cartService = inject(CartService);

  orders!: WritableSignal<IOrders[]>;

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.cartService.getUserOrders().subscribe({
      next: (res) => {
        this.orders.set(res);
      },
    });
  }
}
