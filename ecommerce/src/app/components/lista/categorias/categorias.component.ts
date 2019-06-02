import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../forms/new-product/new-product.service';
import { Product } from 'src/app/shared/models/producto';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  productsObs: Observable<Product[]>;
  products: Product[];
  constructor( private productService: ProductService ) {
  }
  ngOnInit() {
    this.productsObs = this.productService.getCatProducts();
    this.productsObs.subscribe(productos => {
      this.products = productos;
      console.log(this.products);
    });
  }

}
