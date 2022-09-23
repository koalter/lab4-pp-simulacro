import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/Pelicula';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  peliculas: Array<Pelicula> = [];
  peliculaSeleccionada!: Pelicula|null;

  constructor() { }

  ngOnInit(): void {
    const peliculas: string|null = localStorage.getItem('peliculas');

    if (!peliculas) {
      fetch('https://dummyjson.com/users?limit=5')
        .then(res => res.json())
        .then(res => {
          for (const item of res.users) {
            this.peliculas.push({
              id: item.id,
              nombre: item.username,
              tipo: item.university,
              publico: item.age,
              fechaDeEstreno: new Date(item.birthDate),
              foto: item.image
            });
          }
          localStorage.setItem('peliculas', JSON.stringify(this.peliculas));
        });
    } else {
      this.peliculas = JSON.parse(peliculas);
    }
  }

  seleccionarPelicula(pelicula: Pelicula): void {
    console.log(pelicula);
    this.peliculaSeleccionada = pelicula;
  }

  deseleccionarPelicula(): void {
    this.peliculaSeleccionada = null;
  }
}
