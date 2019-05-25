import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/producto';
//import { Observable } from 'rxjs';
import { ProductService } from './new-product.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryProductService } from '../category-product/category-product.service';
import { CategoryProduct } from 'src/app/shared/models/category-product';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  products$: Observable<Product[]>;
  products: Product[];

  categoryProducts$: Observable<CategoryProduct[]>;
  categoryProducts: CategoryProduct[];

  urlImage: Observable<string>;
  uploadPercent: Observable<number>;

  public isAlertE: boolean = false;
  public isAlertC: boolean = false;

  constructor( private productService: ProductService, private categoryProductService: CategoryProductService, private storage: AngularFireStorage ) { }

  ngOnInit() {

    this.categoryProducts$ = this.categoryProductService.getCatProducts();
    this.categoryProducts$.subscribe(categoryProducts => {
      this.categoryProducts = categoryProducts;
      // console.log(this.categoryProducts);
    });

    this.products$ = this.productService.getCatProducts();
    this.products$.subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }

  cambioArchivo(event) {
    const file = event.target.files[0];
    const filePath = `public/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  addProduct($event) {
    $event.preventDefault();
    let form: any = document.forms[0];



    let nombre = form.querySelector('#inputNombre').value ;
    let marca = form.querySelector('#inputMarca').value;
    let precio = form.querySelector('#inputPrecio').value;
    let catProduct = form.querySelector('#inputCatProduct').value;
    let descripcion = form.querySelector('#inputDescripcion').value;


    let expreWord = /^\w+(\s*\-*\w*\d*)*$/;
    let expreNumber = /^[0-9]+$/;

    let image = form.querySelector('#imageProduct').value;

    if ( expreWord.test(nombre) && expreWord.test(marca) && expreWord.test(descripcion) && expreNumber.test(precio) ) {
      
      this.productService.addCatProduct({
        nombre,
        marca,
        precio,
        idCatProducto: catProduct,
        imagen: image,
        descripcion,
      });

      this.isAlertC = true;
      this.isAlertE = false;
    } else {
      this.isAlertC = false;
      this.isAlertE = true;
      alert('Datos incorretos');
      this.isAlertC = false;
      this.isAlertE = false;
    }
    form.reset();
  }
  restart($event) {
    this.isAlertE = false; 
    this.isAlertC = false;
  }
}
