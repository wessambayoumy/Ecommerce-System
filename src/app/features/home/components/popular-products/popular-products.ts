import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { Iproducts } from '../../../../core/Interfaces/Iproducts';
import { Card } from '../../../../shared/components/card/card';
import { ProductService } from '../../../../core/services/product-service';

@Component({
  selector: 'app-popular-products',
  imports: [Card],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css',
})
export class PopularProducts {
  private readonly productService = inject(ProductService);

  ProductList: WritableSignal<Iproducts[]> = signal([]);

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.ProductList.set(response.data);
      },
     
    });
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
}
