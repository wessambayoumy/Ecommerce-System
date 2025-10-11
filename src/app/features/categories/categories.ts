import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoryService } from '../../core/services/category-service';
import { Icategories } from '../../core/Interfaces/icategories';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private readonly categoryService = inject(CategoryService);

  categoryList: WritableSignal<Icategories[]> = signal([]);
  p!: WritableSignal<number>;
  limit!: WritableSignal<number>;
  results!: WritableSignal<number>;

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList.set(res.data);
        this.p.set(res.metadata.currentPage);
        this.limit.set(res.metadata.limit);
        this.results.set(res.results);
      },
    });
  }
}
