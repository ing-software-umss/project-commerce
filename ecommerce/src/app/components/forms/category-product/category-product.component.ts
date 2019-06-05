import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryProduct } from '../../../shared/models/category-product';
import {CategoryProductService} from './category-product.service';
import { FormsModule } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal'; 
import { modalConfigDefaults } from 'ngx-bootstrap/modal/modal-options.class';
//declare var $:any;

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css']
})
export class CategoryProductComponent implements OnInit {
  item: any = {
    nombre:'',
    descripcion:'',
  }
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
  preUpdateCategoryProduct(NomCat: any){
  //this.item = this.categoryProductService.updateCatProduc(NomCat);
  this.item = NomCat;
   //console.log( this.item.descripcion);
  }
  updateCategoryProduct($event){
    let form: any = $event.target.parentNode;
    let name = form.querySelector('#inputNombre').value ;
    let descripcion = form.querySelector('#inputDescripcion').value;

    let expreName = /^\w+(\s\w+)*$/;
    let expreDescripcion = /^\w+(\s\w+)*$/;
    
    if ( expreName.test(name) && expreDescripcion.test(descripcion) ) {      
        this.item.nombre = name;      
        this.item.descripcion = descripcion;
      //  console.log( this.item.nombre);
        this.isAlertE = false;
        this.isAlertC = true;
        this.categoryProductService.updateCatProduc(this.item);
       form.reset();
    } else {
      this.isAlertE = true; 
      this.isAlertC = false;
    
  }
}
  preDeletCatProduc(CatProduct){
  this.item = CatProduct;
  }
  deletCatProducto(){
    this.categoryProductService.deleteItem(this.item);
  }

  restart($event) {
    this.isAlertE = false; 
    this.isAlertC = false;
  }

}
