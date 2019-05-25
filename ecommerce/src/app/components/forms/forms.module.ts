import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { CategoryProductComponent } from './category-product/category-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { StorageBucket } from '@angular/fire/storage';


@NgModule({
  declarations: [CategoryProductComponent, NewProductComponent],
  imports: [
    CommonModule,
    FormsRoutingModule
  ],
  providers: [
    { provide: StorageBucket, useValue: 'my-bucket-name' }
  ]
})
export class FormsModule { }
