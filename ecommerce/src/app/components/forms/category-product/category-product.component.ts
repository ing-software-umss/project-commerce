import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryProduct } from '../../../shared/models/category-product';
import {CategoryProductService} from './category-product.service';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css']
})
export class CategoryProductComponent implements OnInit {

  categoryProducts$: Observable<CategoryProduct[]>;
  categoryProducts: CategoryProduct[];
  constructor( private categoryProductService: CategoryProductService) {}

  ngOnInit() {
    this.categoryProducts$ = this.categoryProductService.getCatProducts();
    this.categoryProducts$.subscribe(categoryProducts => {
      this.categoryProducts = categoryProducts;
      console.log(this.categoryProducts);
    });
  }

  addCategoryProduct($event) {
    $event.preventDefault();
    let form = $event.target.parentNode;
  }

}
