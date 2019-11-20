import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Actividad } from '../models/actividad.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(
    // Referencia al Módulo de FirebaseDatabases
    public afs: AngularFirestore, // Referencia a Firestore
    private storage: AngularFireStorage
  ) { }




  public getActividades() {
    // Consulta para actividades
    return this.afs.collection('actividades');

  }

  // Obtiene un actividad
  public getActividad(aid) {

    return this.afs.collection('actividades').doc(aid);
  }

  // Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(`actividades/${nombreArchivo}`, datos);
  }

  // Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(`actividades/${nombreArchivo}`);
  }


  // Crea un nuevo actividad
  public createActividad(actividad: Actividad, url) {
    actividad.urlImage = url;
    return this.afs.collection('actividades').add(actividad);
  }
  // Actualiza un actividad
  public updateActividad(actividad: Actividad, id, url) {
    actividad.urlImage = url;
    console.log(id);
    return this.afs.collection('actividades').doc(id).set(actividad).then(() => {
      console.log('actualizado correctamento');
    }).catch(err => {
      console.log(err);
    });
  }
  // Elimina una actividad

  public deleteActividad(actividad: Actividad) {
    console.log(actividad.id + 'id');
    return this.afs.collection('actividades').doc(actividad.id).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });

  }
}
