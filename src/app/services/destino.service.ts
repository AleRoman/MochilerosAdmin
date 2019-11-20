import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Destino } from '../models/destino.model';

@Injectable({
  providedIn: 'root'
})
export class DestinoService {



  constructor(
    // Referencia al Módulo de FirebaseDatabases
    public afs: AngularFirestore, // Referencia a Firestore
  ) { }

  // Crea un nuevo destino
  public createDestino(destino: Destino) {
    return this.afs.collection('destinos').add(destino);
  }
  // Obtiene un destino
  public getDestino(destino) {

    return this.afs.collection('destinos').doc(destino.id);
  }
  // Obtiene todos los destinos
  public getDestinos() {
    return this.afs.collection('destinos').snapshotChanges();
  }
  // Actualiza un destino
  public updateDestino(destino: Destino, destino2: Destino) {
    console.log(destino2);
    return this.afs.collection('destinos').doc(destino2.id).set(destino).then(() => {
      console.log('actualizado correctamento');
    }).catch(err => {
      console.log(err);
    });
  }

  // Elimina un destino

  public deleteDestino(destino: Destino) {
    console.log(destino.id + 'id');
    return this.afs.collection('destinos').doc(destino.id).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }
}
