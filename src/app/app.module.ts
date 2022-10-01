import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { PeliculaAltaComponent } from './components/pelicula-alta/pelicula-alta.component';
import { ActorAltaComponent } from './components/actor-alta/actor-alta.component';
import { ActorListadoComponent } from './components/actor-listado/actor-listado.component';
import { PeliculaListadoComponent } from './components/pelicula-listado/pelicula-listado.component';
import { TablaPeliculaComponent } from './components/tabla-pelicula/tabla-pelicula.component';
import { DetallePeliculaComponent } from './components/detalle-pelicula/detalle-pelicula.component';
import { TablaPaisesComponent } from './components/tabla-paises/tabla-paises.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablaActorComponent } from './components/tabla-actor/tabla-actor.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BorrarPeliculaComponent } from './components/borrar-pelicula/borrar-pelicula.component';
import { ModificarPeliculaComponent } from './components/modificar-pelicula/modificar-pelicula.component';
import { ActorPeliculaComponent } from './components/actor-pelicula/actor-pelicula.component';
import { ActorMostrarPeliculasComponent } from './components/actor-mostrar-peliculas/actor-mostrar-peliculas.component';
import { ActorMostrarPaisComponent } from './components/actor-mostrar-pais/actor-mostrar-pais.component';
import { DetalleActorComponent } from './components/detalle-actor/detalle-actor.component';

@NgModule({
  declarations: [
    AppComponent,
    BusquedaComponent,
    PeliculaAltaComponent,
    ActorAltaComponent,
    ActorListadoComponent,
    PeliculaListadoComponent,
    TablaPeliculaComponent,
    DetallePeliculaComponent,
    TablaPaisesComponent,
    TablaActorComponent,
    SpinnerComponent,
    BorrarPeliculaComponent,
    ModificarPeliculaComponent,
    ActorPeliculaComponent,
    ActorMostrarPeliculasComponent,
    ActorMostrarPaisComponent,
    DetalleActorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
