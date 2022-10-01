import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/models/Actor';

@Component({
  selector: 'detalle-actor',
  templateUrl: './detalle-actor.component.html',
  styleUrls: ['./detalle-actor.component.scss']
})
export class DetalleActorComponent implements OnInit {

  @Input() actor! : Actor;
  @Output() limpiar : EventEmitter<void> = new EventEmitter<void>();
  

  constructor() { }

  ngOnInit(): void {
  }

  limpiarDatos() {
    this.limpiar.emit();
  }

}
