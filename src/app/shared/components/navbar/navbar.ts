import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite-service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../../../core/services/cart-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly cookiesService = inject(CookieService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  @Input({ required: true }) isLoggedIn!: boolean;

  count!: number;

  signOut(): void {
    this.cookiesService.delete('token');
    this.router.navigateByUrl('/login');
  }

  cartCount() {
    this.cartService.count.subscribe({
      next: (value) => {
        this.count = value;
      },
    });
  }

  cartData(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartService.count.next(res.numOfCartItems);
      },
    });
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.cartCount();
    isPlatformBrowser(this.platformId) ? this.cartData() : null;
  }
}
