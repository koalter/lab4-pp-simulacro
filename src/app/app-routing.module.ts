import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorAltaComponent } from './components/actor-alta/actor-alta.component';
import { ActorListadoComponent } from './components/actor-listado/actor-listado.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { PeliculaAltaComponent } from './components/pelicula-alta/pelicula-alta.component';
import { PeliculaListadoComponent } from './components/pelicula-listado/pelicula-listado.component';

const routes: Routes = [
  {
    path: 'bienvenido',
    redirectTo: ''
  },
  {
    path: 'búsqueda',
    component: BusquedaComponent
  },
  {
    path: 'busqueda',
    redirectTo: 'búsqueda'
  },
  {
    path: 'peliculas/alta',
    component: PeliculaAltaComponent
  },
  {
    path: 'peliculas/listado',
    component: PeliculaListadoComponent
  },
  {
    path: 'actor/alta',
    component: ActorAltaComponent
  },
  {
    path: 'actor/listado',
    component: ActorListadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
