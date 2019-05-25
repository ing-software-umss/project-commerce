import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/producto';
import { CategoryProduct } from '../../../shared/models/category-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private db: AngularFirestore) {}

  getCatProducts(): Observable<Product[]> {

  
    let aux = this.db.collection<CategoryProduct>('cat-productos').ref;

    let aux2 = aux.where('nombre', '==', 'Celulares');
    console.log("buscado", aux2);

    return this.db.collection<Product>('producto').valueChanges();
  }

  addCatProduct(product: any ): any {

    // guardar la imagen el firestore
    
    return this.db.collection<Product>('producto').add(product);
  }

  // //Tarea para subir archivo
  // public tareaCloudStorage(nombreArchivo: string, datos: any) {
  //   return this.storage.upload(nombreArchivo, datos);
  // }

  // //Referencia del archivo
  // public referenciaCloudStorage(nombreArchivo: string) {
  //   return this.storage.ref(nombreArchivo);
  // }
  
}