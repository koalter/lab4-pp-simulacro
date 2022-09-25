import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/models/Pelicula';
import { PeliculaService } from 'src/app/shared/pelicula.service';

@Component({
  selector: 'tabla-pelicula',
  templateUrl: './tabla-pelicula.component.html',
  styleUrls: ['./tabla-pelicula.component.scss']
})
export class TablaPeliculaComponent implements OnInit {

  @Input() src: Array<Pelicula> = [];
  @Output() seleccion: EventEmitter<Pelicula> = new EventEmitter<Pelicula>();

  constructor(private peliculaService : PeliculaService) { }

  ngOnInit(): void {
  }

  cambiarVista() {
    console.log("cambiarVista()");
  }

  seleccionarPelicula(pelicula: Pelicula) {
    this.seleccion.emit(pelicula);
  }

  recuperarUrlFoto(uri : string) {
    this.peliculaService.recuperarUrlFoto(uri)
    .then(url => url)
    .catch(err => '');
  }
}
