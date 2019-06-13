import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/producto';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private itemDoc: AngularFirestoreDocument<Product>;

  constructor(private db: AngularFirestore) { }

  getCatProducts(): Observable<Product[]> {
    // let aux = this.db.collection<CategoryProduct>('cat-productos').ref;
    // let aux2 = aux.where('nombre', '==', 'Celulares');
    // console.log("buscado", aux2);

    // return this.db.collection<Product>('producto').valueChanges();
    return this.db.collection<Product>('producto').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addCatProduct(product: any): any {
    console.log(product);
    return this.db.collection<Product>('producto').add(product);
  }
  deleteItem(dato) {
    this.itemDoc = this.db.doc<Product>(`producto/${dato.id}`);
    this.itemDoc.delete();
  }
}
