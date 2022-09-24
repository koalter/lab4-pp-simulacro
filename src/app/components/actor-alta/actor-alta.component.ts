import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actor } from '../../models/Actor';

@Component({
  selector: 'actor-alta',
  templateUrl: './actor-alta.component.html',
  styleUrls: ['./actor-alta.component.scss']
})
export class ActorAltaComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.formulario = this.formBuilder.group({
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'fecha': ['', Validators.required],
      'pais': ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  seleccionarPais(pais: string) {
    this.formulario.controls['pais'].setValue(pais);
  }

  altaActor() {
    const actor: Actor = new Actor(this.formulario.controls['nombre'].value,
      this.formulario.controls['apellido'].value,
      this.formulario.controls['fecha'].value,
      this.formulario.controls['pais'].value);

    this.guardarActor(actor);
  }

  private guardarActor(actor: Actor) {
    let actores = localStorage.getItem('actores');
    const listadoAGuardar: Actor[] = [];

    if (actores) {
      listadoAGuardar.push(...JSON.parse(actores));
    }
    
    listadoAGuardar.push(actor);
    localStorage.setItem('actores', JSON.stringify(listadoAGuardar));
    
    this.formulario.reset();
  }
}
