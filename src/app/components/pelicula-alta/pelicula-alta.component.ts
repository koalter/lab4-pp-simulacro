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
      'actor': ['', Validators.required],
      'publico': ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  seleccionarActor(actor: string): void {
    this.formulario.controls['actor'].setValue(actor);
  }

  altaPelicula() {
    const pelicula: Pelicula = new Pelicula(this.formulario.controls['nombre'].value,
      this.formulario.controls['tipo'].value,
      this.formulario.controls['fecha'].value,
      this.formulario.controls['publico'].value,
      this.formulario.controls['actor'].value);
    
    this.guardarPelicula(pelicula);
  }

  private guardarPelicula(pelicula: Pelicula) {
    let peliculas = localStorage.getItem('peliculas');
    const listadoAGuardar: Pelicula[] = [];

    if (peliculas) {
      listadoAGuardar.push(...JSON.parse(peliculas));
    }
    
    listadoAGuardar.push(pelicula);
    localStorage.setItem('peliculas', JSON.stringify(listadoAGuardar));
    
    this.formulario.reset();
  }

  validarNumero(ev: KeyboardEvent): void {
    const key: number = parseInt(ev.key);
    if (isNaN(key) && !(ev.key === 'Backspace' || ev.key === 'Delete' || ev.key === 'Tab' || ev.key.startsWith('Arrow'))) {
      ev.preventDefault();
    }
  }
}
