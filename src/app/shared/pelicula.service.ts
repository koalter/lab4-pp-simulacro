import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, query, updateDoc } from '@angular/fire/firestore';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
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
        const pelicula = new Pelicula(document.id, data['nombre'], data['tipo'], data['fechaDeEstreno'].toDate(), data['publico'], data['foto'], data['actor']);
        pelicula.urlFoto = foto;
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

  async modificarPelicula(pelicula : Pelicula) {
    try {
      await updateDoc(doc(this.firestore, 'peliculas', pelicula.id), {
        nombre: pelicula.nombre,
        tipo: pelicula.tipo,
        publico: pelicula.publico,
        fechaDeEstreno: new Date(pelicula.fechaDeEstreno),
        foto: pelicula.foto,
        actor: pelicula.actor
      });
    } catch (err) {
      this.logger.logError(err);
      throw err;
    }
  }

  async borrarPelicula(pelicula : Pelicula) {
    try {
      const docRef = doc(this.firestore, 'peliculas', pelicula.id);
      const storageRef = ref(this.storage, pelicula.foto);

      await deleteDoc(docRef);
      await deleteObject(storageRef);

    } catch (err) {
      this.logger.logError(err);
      throw err;
    }
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
