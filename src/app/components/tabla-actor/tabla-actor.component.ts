import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/models/Actor';

@Component({
  selector: 'tabla-actor',
  templateUrl: './tabla-actor.component.html',
  styleUrls: ['./tabla-actor.component.scss']
})
export class TablaActorComponent implements OnInit {

  @Output() seleccion: EventEmitter<string>;
  actores: Actor[];


  constructor() { 
    this.seleccion = new EventEmitter<string>();
    this.actores = [];
  }

  ngOnInit(): void {
    const actores: string|null = localStorage.getItem('actores');
    if (actores) {
      const listado: Actor[] = JSON.parse(actores);
      this.actores = listado.sort((a, b) => {
        if (a.apellido < b.apellido) return -1;
        else if (a.apellido > b.apellido) return 1;
        else return 0;
      });
    }
  }

  seleccionarActor(nombreActor: string) {
    this.seleccion.emit(nombreActor);
  }
}
