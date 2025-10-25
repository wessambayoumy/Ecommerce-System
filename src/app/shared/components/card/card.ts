import { Component, inject, input, InputSignal } from '@angular/core';
import { Iproducts } from '../../../core/Interfaces/Iproducts';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart-service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe,TranslatePipe],
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
      },
    });
  }
}
