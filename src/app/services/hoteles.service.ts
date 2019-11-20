import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Hotel } from '../models/hotel.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class HotelesService {

  constructor(
    // Referencia al Módulo de FirebaseDatabases
    public afs: AngularFirestore, // Referencia a Firestore
    private storage: AngularFireStorage
  ) { }




  public getHoteles() {
    // Consulta para hoteles
    return this.afs.collection('hoteles');

  }

  // Obtiene un hotel
  public getHotel(hid) {

    return this.afs.collection('hoteles').doc(hid);
  }

  // Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(`hoteles/${nombreArchivo}`, datos);
  }

  // Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(`hoteles/${nombreArchivo}`);
  }


  // Crea un nuevo hotel
  public createHotel(hotel: Hotel, url) {
    hotel.urlImage = url;
    return this.afs.collection('hoteles').add(hotel);
  }
  // Actualiza un hotel
  public updateHotel(hotel: Hotel, id, url) {
    hotel.urlImage = url;
    console.log(id);
    return this.afs.collection('hoteles').doc(id).set(hotel).then(() => {
      console.log('actualizado correctamento');
    }).catch(err => {
      console.log(err);
    });
  }
  // Elimina un hotel

  public deleteHotel(hotel: Hotel) {
    console.log(hotel.id + 'id');
    return this.afs.collection('hoteles').doc(hotel.id).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });

  }
}
