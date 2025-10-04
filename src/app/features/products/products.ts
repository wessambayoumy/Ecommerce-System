import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { ProductService } from '../../core/services/product-service';
import { Iproducts } from '../../core/Interfaces/Iproducts';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../shared/pipes/filter-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [Card, NgxPaginationModule, FormsModule, FilterPipe],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private readonly productService = inject(ProductService);
  productList: Iproducts[] = [];
  pageSize!: number;
  p!: number;
  total!: number;
  search: string = '';

  getAllProducts(pageNo: number = 1): void {
    this.productService.getAllProducts(pageNo).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      },
     
    });
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
}
