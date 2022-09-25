import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/Pelicula';

@Component({
  selector: 'pelicula-listado',
  templateUrl: './pelicula-listado.component.html',
  styleUrls: ['./pelicula-listado.component.scss']
})
export class PeliculaListadoComponent implements OnInit {

  @Input() src : Pelicula[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
