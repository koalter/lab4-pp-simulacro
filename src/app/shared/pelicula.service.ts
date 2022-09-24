import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { Pelicula } from '../models/Pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  collection = collection(this.firestore, 'peliculas');

  constructor(private firestore : Firestore) { }

  async getPeliculas() {
    const q = query(this.collection);
    const querySnapshot = await getDocs(q);
    const peliculas : Pelicula[] = [];
    
    querySnapshot.forEach(document => {
      const data = document.data();      
      const pelicula = new Pelicula(data['nombre'], data['tipo'], data['fechaDeEstreno'].toDate(), data['publico'], data['foto']);
      peliculas.push(pelicula);
    });

    return peliculas;
  }
}
