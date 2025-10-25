import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
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
  productList: WritableSignal<Iproducts[]> = signal([]);
  pageSize: WritableSignal<number> = signal(10);
  p: WritableSignal<number> = signal(1);
  total: WritableSignal<number> = signal(0);
  search: WritableSignal<string> = signal('');

  getAllProducts(pageNo: number = 1): void {
    this.productService.getAllProducts(pageNo).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        this.pageSize.set(res.metadata.limit);
        this.p.set(res.metadata.currentPage);
        this.total.set(res.results);
      },
    });
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
}
