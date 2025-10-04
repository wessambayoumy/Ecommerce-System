import { Component, inject, OnInit } from '@angular/core';
import { Iproducts } from '../../core/Interfaces/Iproducts';
import { IBrands } from '../../core/Interfaces/ibrands';
import { BrandService } from '../../core/services/brand-service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-brands',
  imports: [NgxPaginationModule],
  templateUrl: './brands.html',
  styleUrl: './brands.css',
})
export class Brands implements OnInit {
  private readonly brandService = inject(BrandService);

  brandList: IBrands[] = [];
  p!: number;
  limit!: number;
  results!: number;

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(pageNo: number = 1): void {
    this.brandService.getAllBrands(pageNo).subscribe({
      next: (res) => {
        this.brandList = res.data;
        this.p = res.metadata.currentPage;
        this.limit = res.metadata.limit;
        this.results = res.results;
      },
    });
  }
}
