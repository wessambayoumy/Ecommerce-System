import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoryService } from '../../../../core/services/category-service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategories } from '../../../../core/Interfaces/icategories';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.html',
  styleUrl: './popular-categories.css',
})
export class PopularCategories implements OnInit {
  private readonly categoryService = inject(CategoryService);
  categoryList: WritableSignal<Icategories[]> = signal([]);

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
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList.set(res.data);
      },
    });
  }
}
