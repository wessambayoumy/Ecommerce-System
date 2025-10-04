import { Component, inject, OnInit } from '@angular/core';
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

  categoryList: Icategories[] = [];
  p!: number;
  limit!: number;
  results!: number;

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
        this.p = res.metadata.currentPage;
        this.limit = res.metadata.limit;
        this.results = res.results;
      },
    });
  }
}
