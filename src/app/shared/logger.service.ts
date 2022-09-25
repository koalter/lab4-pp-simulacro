import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class Logger {

  constructor(private firestore : Firestore) { }

  async logError(message: any) {
    await addDoc(collection(this.firestore, 'errores'), {
      mensaje: message.toString(),
      fecha: new Date(Date.now())
    });
  }
}
