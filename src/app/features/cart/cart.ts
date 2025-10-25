import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ICart } from '../../core/Interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart-service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, TranslatePipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private readonly cartService = inject(CartService);

  cartProducts: WritableSignal<ICart> = signal({} as ICart);
  count:WritableSignal<number> = signal(this.cartService.count());

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((res) => {
      this.cartProducts.set(res.data);
    });
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId).subscribe((res) => {
      this.cartService.count.set(res.numOfCartItems);
      this.cartProducts.set(res.data);
    });
  }

  updateCount(productId: string, count: number) {
    if (count > 0) {
      this.cartService.updateCartItem(productId, count).subscribe((res) => {
        this.cartProducts.set(res.data);
      });
    }
  }
  clearCart() {
    this.cartService.clearCart().subscribe((res) => {
      this.cartService.count.set(0);
    });
  }
}
