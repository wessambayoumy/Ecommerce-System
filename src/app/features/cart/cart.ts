import { Component, inject, OnInit } from '@angular/core';
import { ICart } from '../../core/Interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart-service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private readonly cartService = inject(CartService);

  cartProducts: ICart = {} as ICart;

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((res) => {
      this.cartProducts = res.data;
    });
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId).subscribe((res) => {
      this.cartService.count.next(res.numOfCartItems);
      this.cartProducts = res.data;
    });
  }

  updateCount(productId: string, count: number) {
    if (count > 0) {
      this.cartService.updateCartItem(productId, count).subscribe((res) => {
        this.cartProducts = res.data;
      });
    }
  }
}
