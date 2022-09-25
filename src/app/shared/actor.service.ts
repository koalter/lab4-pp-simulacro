import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';
import { Actor } from '../models/Actor';
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
}
