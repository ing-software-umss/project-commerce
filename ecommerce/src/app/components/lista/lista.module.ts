import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaRoutingModule } from './lista-routing.module';
import { CategoriasComponent } from './categorias/categorias.component';

@NgModule({
  declarations: [CategoriasComponent],
  imports: [
    CommonModule,
    ListaRoutingModule
  ]
})
export class ListaModule { }
