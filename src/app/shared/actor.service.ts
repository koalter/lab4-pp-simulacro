import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { Actor } from '../models/Actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  
  collection = collection(this.firestore, 'actores');

  constructor(private firestore : Firestore) { }

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
}
