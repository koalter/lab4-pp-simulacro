import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/models/Actor';

@Component({
  selector: 'actor-mostrar-peliculas',
  templateUrl: './actor-mostrar-peliculas.component.html',
  styleUrls: ['./actor-mostrar-peliculas.component.scss']
})
export class ActorMostrarPeliculasComponent implements OnInit {

  @Input() actor! : Actor;
  @Output() limpiar : EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  limpiarDatos() {
    this.limpiar.emit();
  }
}
