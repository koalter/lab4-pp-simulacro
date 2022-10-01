import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/Actor';

@Component({
  selector: 'app-actor-pelicula',
  templateUrl: './actor-pelicula.component.html',
  styleUrls: ['./actor-pelicula.component.scss']
})
export class ActorPeliculaComponent implements OnInit {

  actorSeleccionado! : Actor;
  cargarSpinner : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  seleccionarActor(actor : Actor) {
    this.actorSeleccionado = actor;
  }

}
