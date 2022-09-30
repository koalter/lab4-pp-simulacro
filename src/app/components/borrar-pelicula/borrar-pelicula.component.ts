import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/models/Pelicula';

@Component({
  selector: 'borrar-pelicula',
  templateUrl: './borrar-pelicula.component.html',
  styleUrls: ['./borrar-pelicula.component.scss']
})
export class BorrarPeliculaComponent implements OnInit {

  @Input() pelicula!: Pelicula;
  @Output() borrar: EventEmitter<Pelicula> = new EventEmitter<Pelicula>();

  
  constructor() { }

  ngOnInit(): void {
  }

  borrarPelicula() {
    this.borrar.emit(this.pelicula);
  }
}
