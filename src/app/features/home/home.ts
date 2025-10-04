import { Component } from '@angular/core';
import { PopularProducts } from "./components/popular-products/popular-products";
import { MainSlider } from "./components/main-slider/main-slider";
import { PopularCategories } from "./components/popular-categories/popular-categories";


@Component({
  selector: 'app-home',
  imports: [PopularProducts, MainSlider, PopularCategories],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home  {
  
}
