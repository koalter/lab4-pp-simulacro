import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Actor } from '../models/Actor';
import { Pais } from '../models/Pais';
import { Pelicula } from '../models/Pelicula';
import { Logger } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  
  collection = collection(this.firestore, 'actores');

  constructor(private firestore : Firestore,
    private logger : Logger) { }

  async getActores() {
    const q = query(this.collection);
    const querySnapshot = await getDocs(q);
    const actores : Actor[] = [];
    
    querySnapshot.forEach(document => {
      const data = document.data();      
      const pelicula = new Actor(data['nombre'], data['apellido'], data['fechaDeNacimiento'].toDate(), data['nacionalidad']);
      actores.push(pelicula);
    });

    return actores.sort(this.sort);
  }

  private sort(pre : Actor, pro : Actor) {
    if (pre.apellido > pro.apellido) return 1;
    if (pre.apellido < pro.apellido) return -1;
    return 0;
  }

  async guardarActor(actor : Actor) {
    try {
      const docRef = await addDoc(this.collection, {
        nombre: actor.nombre,
        apellido: actor.apellido,
        nacionalidad: actor.nacionalidad,
        fechaDeNacimiento: new Date(actor.fechaDeNacimiento)
      });
      return docRef.id;
    } catch (err) {
      this.logger.logError(err);
      throw err;
    }
  }

  async getPeliculas(actor : Actor) : Promise<Pelicula[]> {
    const nombreCompleto = `${actor.nombre} ${actor.apellido}`;
    const q = query(collection(this.firestore, 'peliculas'), where("actor", "==", nombreCompleto));
    const querySnapshot = await getDocs(q);
    const peliculas : Pelicula[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      peliculas.push(new Pelicula(doc.id, data['nombre'], data['tipo'], data['fechaDeEstreno'].toDate(), data['publico'], data['foto'], nombreCompleto));
    });

    return peliculas;
  }

  async getNacionalidad(actor : Actor) : Promise<any> {
    const paises: string|null = localStorage.getItem('paises');
    if (!paises) {
      try {
        const result = (await (await fetch("https://restcountries.com/v2/name/" + actor.nacionalidad)).json());
        const pais = new Pais(result.translations['es'], result.flag, result.alpha2Code);

        return pais;
      } catch (err) {
        this.logger.logError(err);
        throw err;
      }
    } else {
      const result : [] = JSON.parse(paises); console.log(result);
      const pais = result.find(p => p['nombre'] === actor.nacionalidad);
      return pais;
    }
  }
}
