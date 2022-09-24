import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pais } from '../../models/Pais';

@Component({
  selector: 'tabla-paises',
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.scss']
})
export class TablaPaisesComponent implements OnInit {

  @Output() seleccion: EventEmitter<string>;
  paises: Pais[];

  constructor() { 
    this.seleccion = new EventEmitter<string>();
    this.paises = [];
  }

  ngOnInit(): void {
    const paises: string|null = localStorage.getItem('paises');
    if (!paises) {
      fetch("https://restcountries.com/v2/all?fields=translations,alpha2Code,flag")
        .then(res => res.json())
        .then(res => {
          for (const item of res) {
            this.paises.push(new Pais(item.translations['es'], item.flag, item.alpha2Code));
          }
          localStorage.setItem('paises', JSON.stringify(this.paises));

        });
    } else {
      this.paises = JSON.parse(paises);
    }
  }

  seleccionarPais(nombrePais: string) {
    this.seleccion.emit(nombrePais);
  }
}
