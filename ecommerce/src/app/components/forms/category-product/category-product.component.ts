import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryProduct } from '../../../shared/models/category-product';
import {CategoryProductService} from './category-product.service';
//declare var $:any;

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css']
})
export class CategoryProductComponent implements OnInit {
  
  public isAlertE: boolean = false;
  public isAlertC: boolean = false;
  categoryProducts$: Observable<CategoryProduct[]>;
  categoryProducts: CategoryProduct[];
  
  constructor( private categoryProductService: CategoryProductService) {
    
  }

  ngOnInit() {
    this.categoryProducts$ = this.categoryProductService.getCatProducts();
    this.categoryProducts$.subscribe(categoryProducts => {
      this.categoryProducts = categoryProducts;
      console.log(this.categoryProducts);
    });
  }

  addCategoryProduct($event) {
    $event.preventDefault();
    
    let form: any = $event.target.parentNode;
    let name = form.querySelector('#inputNombre').value ;
    let descripcion = form.querySelector('#inputDescripcion').value;

    let expreName = /^\w+(\s\w+)*$/;
    let expreDescripcion = /^\w+(\s\w+)*$/;
    
    if ( expreName.test(name) && expreDescripcion.test(descripcion) ) {
      this.categoryProductService.addCatProduct({
        nombre: name,
        descripcion,
        
      });
      this.isAlertE = false;
      this.isAlertC = true;
     form.reset();
    } else {
      this.isAlertE = true; 
      this.isAlertC = false;
     
    }
    
  }
  restart($event) {
    this.isAlertE = false; 
    this.isAlertC = false;
  }

}
