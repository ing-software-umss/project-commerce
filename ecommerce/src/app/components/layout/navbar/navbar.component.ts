import { Component, OnInit } from '@angular/core';
import { CategoryProductService } from '../../forms/category-product/category-product.service';
import { CategoryProduct } from 'src/app/shared/models/category-product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // listaCategorias: 
  categoriasObservable: Observable<CategoryProduct[]>;
  categorias: CategoryProduct[];
  constructor(private categoryProductService: CategoryProductService) {
    
  }
  public isLogged: boolean = false;// switch para ususario logeado y no legeados, true = logeado
  public isLoggedAdm: boolean = false;// switch para admin logeado y no legeados, true = logeado
  ngOnInit() {
    this.categoriasObservable = this.categoryProductService.getCatProducts();
    this.categoriasObservable.subscribe(categoryProducts => {
      this.categorias = categoryProducts;
    });
  }
  onCambiar(mesaje: string){
    //this.categoryProductService.cambiar(mesaje);
  }

}
