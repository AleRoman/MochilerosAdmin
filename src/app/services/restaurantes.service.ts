import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Restaurante } from '../models/restaurante.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {

  constructor(
    // Referencia al Módulo de FirebaseDatabases
    public afs: AngularFirestore, // Referencia a Firestore
    private storage: AngularFireStorage
  ) { }




  public getRestaurantes() {
    // Consulta para restaurantes
    return this.afs.collection('restaurantes');

  }

  // Obtiene un restaurante
  public getRestaurante(rid) {

    return this.afs.collection('restaurantes').doc(rid);
  }

  // Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(`restaurantes/${nombreArchivo}`, datos);
  }

  // Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(`restaurantes/${nombreArchivo}`);
  }


  // Crea un nuevo restaurante
  public createRestaurante(restaurante: Restaurante, url) {
    restaurante.urlImage = url;
    return this.afs.collection('restaurantes').add(restaurante);
  }
  // Actualiza un restaurante
  public updateRestaurante(restaurante: Restaurante, id, url) {
    restaurante.urlImage = url;
    console.log(id);
    return this.afs.collection('restaurantes').doc(id).set(restaurante).then(() => {
      console.log('actualizado correctamento');
    }).catch(err => {
      console.log(err);
    });
  }
  // Elimina un restaurante

  public deleteRestaurante(restaurante: Restaurante) {
    console.log(restaurante.id + 'id');
    return this.afs.collection('restaurantes').doc(restaurante.id).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });

  }
}
