import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/models/Pelicula';

@Component({
  selector: 'tabla-pelicula',
  templateUrl: './tabla-pelicula.component.html',
  styleUrls: ['./tabla-pelicula.component.scss']
})
export class TablaPeliculaComponent implements OnInit {

  @Input() src: Array<Pelicula> = [];
  @Output() seleccion: EventEmitter<Pelicula> = new EventEmitter<Pelicula>();

  constructor() { }

  ngOnInit(): void {
  }

  cambiarVista() {
    console.log("cambiarVista()");
  }

  seleccionarPelicula(pelicula: Pelicula) {
    this.seleccion.emit(pelicula);
  }
}
