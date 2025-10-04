import { Component, inject, Input } from '@angular/core';
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

  ProductList: Iproducts[] = [];

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response.data);
        this.ProductList = response.data;
      },
     
    });
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
}
