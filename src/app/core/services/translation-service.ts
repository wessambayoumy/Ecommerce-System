import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Inject,
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly renderer2 = inject(RendererFactory2).createRenderer(
    null,
    null
  );
  constructor(
    private readonly translateService: TranslateService,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    if (isPlatformBrowser(platformId)) {
      this.translateService.setFallbackLang('en');

      const savedLang = localStorage.getItem('lang');
      if (savedLang) {
        this.translateService.use(savedLang);
      }
      this.changeDirection();
    }
  }

  changeDirection(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('lang') === 'ar') {
        this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
        this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
      } else if (localStorage.getItem('lang') === 'en') {
        this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
        this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
      }
    }
  }
}
