import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
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

  brandList: WritableSignal<IBrands[]> = signal([]);
  p: WritableSignal<number> = signal(1);
  limit: WritableSignal<number> = signal(10);
  results: WritableSignal<number> = signal(0);

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(pageNo: number = 1): void {
    this.brandService.getAllBrands(pageNo).subscribe({
      next: (res) => {
        this.brandList.set(res.data);
        this.p.set(res.metadata.currentPage);
        this.limit.set(res.metadata.limit);
        this.results.set(res.results);
      },
    });
  }
}
