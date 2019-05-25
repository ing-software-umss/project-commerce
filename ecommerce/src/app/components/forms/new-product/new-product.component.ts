import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/producto';
//import { Observable } from 'rxjs';
import { ProductService } from './new-product.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  products$: Observable<Product[]>;
  products: Product[];
  urlImage: Observable<string>;
  uploadPercent: Observable<number>;

  constructor( private productService: ProductService, private storage: AngularFireStorage ) { }

  ngOnInit() {
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
    console.log(form)

    /**
     * inputNombre
     * inputMarca
     * inputPrecio
     * inputCatProduct
     * inputImagen
     * inputDescripcion
     */

    let nombre = form.querySelector('#inputNombre').value ;
    let marca = form.querySelector('#inputMarca').value;
    let precio = form.querySelector('#inputPrecio').value;
    let catProduct = form.querySelector('#inputCatProduct').value;
    let descripcion = form.querySelector('#inputDescripcion').value;


    let expreWord = /^\w+(\s\w+)*$/;
    let expreNumber = /^[0-9]+$/;

    console.log(expreWord.test(nombre));
    console.log(expreWord.test(marca));
    console.log(expreNumber.test(precio));
    console.log(expreWord.test(descripcion));
    let image = form.querySelector('#imageProduct').value;

    // validar la imagen
    if ( expreWord.test(nombre) && expreWord.test(marca) && expreWord.test(descripcion) && expreNumber.test(precio) ) {
      
      this.productService.addCatProduct({
        nombre,
        marca,
        precio,
        idCatProducto: '/cat-product/0',
        imagen: image,
        descripcion,
      });
    } else {
      alert('Error de validacion, campos incorrectos');
    }

    form.reset();
  }

}
