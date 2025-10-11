import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproducts } from '../../core/Interfaces/Iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { DetailService } from '../../core/services/detail-service';
import { CartService } from '../../core/services/cart-service';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly detailService = inject(DetailService);
  private readonly cartService = inject(CartService);
  productId: WritableSignal<string | null> = signal(null);
  productDetails: WritableSignal<Iproducts> = signal({} as Iproducts);

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetails();
  }
  getProductDetails(): void {
    this.detailService.getProductDetails(this.productId()).subscribe({
      next: (res) => {
        this.productDetails.set(res.data);
      },
    });
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productId.set(param.get('id'));
      },
    });
  }
  addToCart(): void {
    this.cartService.addToCart(this.productId()!).subscribe();
  }
}
