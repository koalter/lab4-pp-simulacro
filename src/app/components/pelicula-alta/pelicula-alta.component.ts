import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pelicula } from 'src/app/models/Pelicula';
import { PeliculaService } from 'src/app/shared/pelicula.service';

@Component({
  selector: 'app-pelicula-alta',
  templateUrl: './pelicula-alta.component.html',
  styleUrls: ['./pelicula-alta.component.scss']
})
export class PeliculaAltaComponent implements OnInit {

  formulario: FormGroup;
  archivo: any;
  nombreArchivo : string;

  constructor(private formBuilder: FormBuilder,
    private peliculaService : PeliculaService) { 
    this.nombreArchivo = '';
    this.formulario = this.formBuilder.group({
      'nombre': ['', Validators.required],
      'tipo': ['', Validators.required],
      'fecha': ['', Validators.required],
      'actor': ['', Validators.required],
      'publico': ['', Validators.required],
      'foto': ['']
    });
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
      this.nombreArchivo,
      this.formulario.controls['actor'].value);

    this.peliculaService.guardarPelicula(pelicula)
    .then(res => {
      this.peliculaService.guardarFoto(this.archivo, this.nombreArchivo)
      .then(res => console.log(res))
      .catch(err => console.error(err));
    });
  }

  private guardarPelicula(pelicula: Pelicula) {
    console.log(pelicula);
  }

  validarNumero(ev: KeyboardEvent): void {
    const key: number = parseInt(ev.key);
    if (isNaN(key) && !(ev.key === 'Backspace' || ev.key === 'Delete' || ev.key === 'Tab' || ev.key.startsWith('Arrow'))) {
      ev.preventDefault();
    }
  }

  generarFoto(event : any) {
    this.archivo = event.target.files[0];
    const filename = this.archivo.name.split('.');
    const ext = filename[filename.length - 1];
    const objectUrl = URL.createObjectURL(this.archivo).split('/');

    console.log(ext);
    console.log(objectUrl[objectUrl.length - 1]);

    this.nombreArchivo = `peliculas/${objectUrl[objectUrl.length - 1]}.${ext}`;
  }
}
