import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproducts } from '../../core/Interfaces/Iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
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
  private readonly toastrService = inject(ToastrService);
  productId: string | null = null;
  productDetails: Iproducts = {} as Iproducts;

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
    this.detailService.getProductDetails(this.productId).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productDetails = res.data;
      },
    });
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param.get('id'));
        this.productId = param.get('id');
      },
    });
  }
  addToCart(): void {
    this.cartService.addToCart(this.productId!).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'FreshCart');
      },
    });
  }
}
