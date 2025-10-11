import { Component, inject, input, Input, InputSignal } from '@angular/core';
import { Iproducts } from '../../../core/Interfaces/Iproducts';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart-service';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  private readonly cartService = inject(CartService);
  product: InputSignal<Iproducts> = input({} as Iproducts);

  addToCart(productId: string) {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.cartService.count.set(res.numOfCartItems);
        console.log(this.cartService.count);
      },
    });
  }
}
