import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pelicula } from 'src/app/models/Pelicula';

@Component({
  selector: 'app-pelicula-alta',
  templateUrl: './pelicula-alta.component.html',
  styleUrls: ['./pelicula-alta.component.scss']
})
export class PeliculaAltaComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.formulario = this.formBuilder.group({
      'nombre': ['', Validators.required],
      'tipo': ['', Validators.required],
      'fecha': ['', Validators.required],
      'actor': ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  seleccionarActor(actor: string) {
    this.formulario.controls['actor'].setValue(actor);
  }

  altaPelicula() {
    const pelicula: Pelicula = new Pelicula(this.formulario.controls['nombre'].value,
      this.formulario.controls['tipo'].value,
      this.formulario.controls['fecha'].value,
      0,
      this.formulario.controls['actor'].value);
    console.log(pelicula);
  }
}
