import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  PLATFORM_ID,
  Signal,
} from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite-service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../../../core/services/cart-service';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translation-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly cookiesService = inject(CookieService);
  private readonly cartService = inject(CartService);
  private readonly translationService = inject(TranslationService);
  private readonly translateService = inject(TranslateService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  isLoggedIn: InputSignal<boolean> = input(false);

  count: Signal<number> = computed(() => {
    return this.cartService.count();
  });

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    isPlatformBrowser(this.platformId) ? this.cartData() : null;
  }

  signOut(): void {
    this.cookiesService.delete('token');
    this.router.navigateByUrl('/login');
  }
  changeLang(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
      this.translateService.use(lang);
      this.translationService.changeDirection();
    }
  }

  cartData(): void {
    if (this.cookiesService.get('token')) {
      this.cartService.getCart().subscribe({
        next: (res) => {
          this.cartService.count.set(res.numOfCartItems);
        },
      });
    }
  }
}
