import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoryProduct } from '../../../shared/models/category-product';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {

  constructor( private db: AngularFirestore) {}

  getCatProducts(): Observable<CategoryProduct[]> {
    return this.db.collection<CategoryProduct>('cat-productos').valueChanges();
  }

  addCatProduct( catProduct: any ): any {
    return this.db.collection<CategoryProduct>('cat-productos').add(catProduct);
  }
  
}

