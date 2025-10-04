import { Component, inject, Input } from '@angular/core';
import { Iproducts } from '../../../core/Interfaces/Iproducts';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  private readonly cartService = inject(CartService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  @Input() product: Iproducts = {} as Iproducts;

  addToCart(productId: string) {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.cartService.count.next(res.numOfCartItems);
        console.log(this.cartService.count);
      },
    
    });
  }
}
