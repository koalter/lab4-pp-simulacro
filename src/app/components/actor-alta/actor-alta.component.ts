import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActorService } from 'src/app/shared/actor.service';
import { Actor } from '../../models/Actor';

@Component({
  selector: 'actor-alta',
  templateUrl: './actor-alta.component.html',
  styleUrls: ['./actor-alta.component.scss']
})
export class ActorAltaComponent implements OnInit {

  formulario: FormGroup;
  cargarSpinner: boolean = true;

  constructor(private formBuilder : FormBuilder,
    private actorService : ActorService) { 
    this.formulario = this.formBuilder.group({
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'fecha': ['', Validators.required],
      'pais': ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
  }

  seleccionarPais(pais: string) {
    this.formulario.controls['pais'].setValue(pais);
  }

  altaActor() {
    this.cargarSpinner = true;
    const actor: Actor = new Actor(this.formulario.controls['nombre'].value,
      this.formulario.controls['apellido'].value,
      this.formulario.controls['fecha'].value,
      this.formulario.controls['pais'].value
    );

    this.actorService.guardarActor(actor).then(id => {
      this.formulario.reset();
      this.cargarSpinner = false;
    }).catch(err => alert(err));
  }

}
