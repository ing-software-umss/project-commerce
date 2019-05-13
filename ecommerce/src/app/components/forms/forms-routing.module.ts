import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryProductComponent } from './category-product/category-product.component';

const routes: Routes = [
  { path: '', component: CategoryProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
