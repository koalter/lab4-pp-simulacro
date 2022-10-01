import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/Actor';
import { Pais } from 'src/app/models/Pais';
import { Pelicula } from 'src/app/models/Pelicula';
import { ActorService } from 'src/app/shared/actor.service';

@Component({
  selector: 'app-actor-pelicula',
  templateUrl: './actor-pelicula.component.html',
  styleUrls: ['./actor-pelicula.component.scss']
})
export class ActorPeliculaComponent implements OnInit {

  actorSeleccionado! : Actor;
  peliculasAsociadas! : Pelicula[];
  paisAsociado! : Pais;
  cargarSpinner : boolean = true;

  constructor(private actorService : ActorService) { }

  ngOnInit(): void {
  }

  async seleccionarActor(actor : Actor) {
    this.cargarSpinner = true;
    this.actorSeleccionado = actor;

    try {
      this.peliculasAsociadas = await this.actorService.getPeliculas(this.actorSeleccionado);
      this.paisAsociado = await this.actorService.getNacionalidad(this.actorSeleccionado);
    } catch (err) {
      console.error(err);
    } finally {
      this.cargarSpinner = false;
    }
  }

}
