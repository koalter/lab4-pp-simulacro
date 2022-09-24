import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/Pelicula';
import { PeliculaService } from 'src/app/shared/pelicula.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  peliculas: Array<Pelicula> = [];
  peliculaSeleccionada!: Pelicula|null;

  constructor(private peliculaService : PeliculaService) { }

  ngOnInit(): void {
    
    this.peliculaService.getPeliculas().then(res => {
      this.peliculas = res;
      localStorage.setItem('peliculas', JSON.stringify(this.peliculas));

    }).catch(err => {
      const local: string|null = localStorage.getItem('peliculas');
      if (local) {
        this.peliculas = JSON.parse(local);
      }
      console.error(err);
      
    });
  }

  seleccionarPelicula(pelicula: Pelicula): void {
    this.peliculaSeleccionada = pelicula;
  }

  deseleccionarPelicula(): void {
    this.peliculaSeleccionada = null;
  }
}
