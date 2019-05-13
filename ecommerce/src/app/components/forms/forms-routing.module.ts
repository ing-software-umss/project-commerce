import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryProductComponent } from './category-product/category-product.component';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
  { path: 'category', component: CategoryProductComponent },
  { path: 'new', component: NewProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
