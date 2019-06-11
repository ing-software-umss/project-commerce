import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoryProduct } from '../../../shared/models/category-product';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {
  nombreCategoria: string;
  private itemDoc: AngularFirestoreDocument<CategoryProduct>;
  constructor( private db: AngularFirestore) {}

  getCatProducts(): Observable<CategoryProduct[]> {
    return this.db.collection<CategoryProduct>('cat-productos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CategoryProduct;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addCatProduct( catProduct: any ): any {
    return this.db.collection<CategoryProduct>('cat-productos').add(catProduct);
  }
  deleteItem(dato) {
    console.log('deleteItem', dato.id);
    this.itemDoc = this.db.doc<CategoryProduct>(`cat-productos/${dato.id}`);
    this.itemDoc.delete();
  }

  updateCatProduc(dato){
    this.itemDoc = this.db.doc<CategoryProduct>(`cat-productos/${dato.id}`);
    this.itemDoc.update(dato);
    
  // return console.log('deleteItem', this.db.collection<CategoryProduct>('cat-productos').doc('name'));
  }
  cambiar(mensaje: string){
    this.nombreCategoria = mensaje;
  }
  
}
