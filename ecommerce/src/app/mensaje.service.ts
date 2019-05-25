import { ThrowStmt } from '@angular/compiler';

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class MensajeService {
  mensaje: string;
  constructor() { }
  moficicarMensaje(mensaje: string){
    this.mensaje = mensaje;
  }
  getMensaje(): string {
    return this.mensaje;
  }
}
