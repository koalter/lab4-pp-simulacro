import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pais } from 'src/app/models/Pais';

@Component({
  selector: 'actor-mostrar-pais',
  templateUrl: './actor-mostrar-pais.component.html',
  styleUrls: ['./actor-mostrar-pais.component.scss']
})
export class ActorMostrarPaisComponent implements OnInit {

  @Input() pais! : Pais;
  @Output() limpiar : EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  limpiarDatos() {
    this.limpiar.emit();
  }
}
