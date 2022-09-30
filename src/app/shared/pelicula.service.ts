import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Pelicula } from '../models/Pelicula';
import { Logger } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  collection = collection(this.firestore, 'peliculas');

  constructor(private firestore : Firestore,
    private storage : Storage,
    private logger : Logger) { }

  async getPeliculas() {
    const q = query(this.collection);
    const querySnapshot = await getDocs(q);
    const peliculas : Pelicula[] = [];
    
    querySnapshot.forEach(document => {
      const data = document.data();
      
      this.recuperarUrlFoto(data['foto']).then(url => {
        const foto = url;
        const pelicula = new Pelicula(document.id, data['nombre'], data['tipo'], data['fechaDeEstreno'].toDate(), data['publico'], foto, data['actor']);
        peliculas.push(pelicula);
      });
    });

    return peliculas.sort(this.sort);
  }

  private sort(pre : Pelicula, pro : Pelicula) {
    if (pre.nombre > pro.nombre) return 1;
    if (pre.nombre < pro.nombre) return -1;
    return 0;
  }

  async guardarPelicula(pelicula : Pelicula) {
    try {
      const docRef = await addDoc(this.collection, {
        nombre: pelicula.nombre,
        tipo: pelicula.tipo,
        publico: pelicula.publico,
        fechaDeEstreno: new Date(pelicula.fechaDeEstreno),
        foto: pelicula.foto,
        actor: pelicula.actor
      });
      return docRef.id;
    } catch (err) {
      this.logger.logError(err);
      throw err;
    }
  }

  modificarPelicula(pelicula : Pelicula) {
    
  }

  async guardarFoto(archivo : File, nombreArchivo : string) {
    try {
      const storageRef = ref(this.storage, nombreArchivo);
      const snapshot = await uploadBytes(storageRef, archivo);
      return nombreArchivo;
    } catch (err) {
      this.logger.logError(err);
      throw err;
    }
  }

  async recuperarUrlFoto(uri : string) {
    try {
      return await getDownloadURL(ref(this.storage, uri));
    } catch (err) {
      this.logger.logError(err);
      throw err;
    }
  }

}
