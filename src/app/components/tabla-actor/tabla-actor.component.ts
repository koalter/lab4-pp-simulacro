import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/models/Actor';
import { ActorService } from 'src/app/shared/actor.service';

@Component({
  selector: 'tabla-actor',
  templateUrl: './tabla-actor.component.html',
  styleUrls: ['./tabla-actor.component.scss']
})
export class TablaActorComponent implements OnInit {

  @Output() seleccion: EventEmitter<string>;
  actores: Actor[];


  constructor(private actorService : ActorService) { 
    this.seleccion = new EventEmitter<string>();
    this.actores = [];
  }

  ngOnInit(): void {

    this.actorService.getActores().then(res => {
      this.actores = res;
      localStorage.setItem('actores', JSON.stringify(this.actores));

    }).catch(err => {
      const local: string|null = localStorage.getItem('actores');
      if (local) {
        this.actores = JSON.parse(local);
      }
      console.error(err);
      
    });
  }

  seleccionarActor(nombreActor: string) {
    this.seleccion.emit(nombreActor);
  }
}
