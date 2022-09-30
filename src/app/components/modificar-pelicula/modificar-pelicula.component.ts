import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pelicula, TipoDePelicula } from 'src/app/models/Pelicula';
import { PeliculaAltaComponent } from '../pelicula-alta/pelicula-alta.component';

@Component({
  selector: 'modificar-pelicula',
  templateUrl: './modificar-pelicula.component.html',
  styleUrls: ['./modificar-pelicula.component.scss']
})
export class ModificarPeliculaComponent implements OnInit {

  @Input() pelicula!: Pelicula;
  @Output() modificar: EventEmitter<Pelicula> = new EventEmitter<Pelicula>();
  formulario! : FormGroup;
  
  constructor(private formBuilder : FormBuilder) { 
    
  }
  
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      'nombre': new FormControl<string>(this.pelicula.nombre, Validators.required),
      'tipo': [this.pelicula.tipo, Validators.required],
      'fecha': [formatDate(this.pelicula.fechaDeEstreno, 'yyyy-MM-dd', 'en-US'), Validators.required],
      'publico': [this.pelicula.publico, Validators.required]
    });
  }

  modificarPelicula() {
    const pelicula = new Pelicula(this.pelicula.id,
      this.formulario.controls['nombre'].value,
      this.formulario.controls['tipo'].value,
      this.formulario.controls['fecha'].value,
      this.formulario.controls['publico'].value,
      this.pelicula.foto,
      this.pelicula.actor);
      
    this.modificar.emit(pelicula);
  }
}
