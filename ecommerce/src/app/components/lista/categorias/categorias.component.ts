import { Component, OnInit, Input } from '@angular/core';
import { MensajeService } from 'src/app/mensaje.service';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private servicioMensaje: MensajeService) {
  }
  ngOnInit() {
  }
  mensajeRecivido(): string {
    return this.servicioMensaje.getMensaje();
  }

}
