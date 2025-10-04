import { Component, inject, OnInit } from '@angular/core';
import { IOrders } from '../../core/Interfaces/iorders';
import { CartService } from '../../core/services/cart-service';
import { AuthService } from '../../core/services/auth-service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.html',
  styleUrl: './allorders.css',
})
export class Allorders implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);

  orders!: IOrders[];

  ngOnInit(): void {
    console.log(this.authService.decodeToken().id);
    this.getAllOrders();
  }

  getAllOrders() {
    this.cartService.getUserOrders().subscribe({
      next: (res) => {
        this.orders = res;
      },
    });
  }
}
