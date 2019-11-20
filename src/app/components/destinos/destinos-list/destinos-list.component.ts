import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DestinoService } from 'src/app/services/destino.service';
import { Destino } from 'src/app/models/destino.model';

@Component({
  selector: 'app-destinos-list',
  templateUrl: './destinos-list.component.html',
  styleUrls: ['./destinos-list.component.scss']
})
export class DestinosListComponent implements OnInit {

  public showModal = false;
  public showModal2 = false;

  // Array de destinos
  public destinos = [];
  // tslint:disable-next-line:ban-types
  destino = {} as Destino;

  // Form
  public newDestinoForm = new FormGroup({
    nombre: new FormControl('', Validators.required)
  });

  public updateDestinoForm = new FormGroup({
    nombre: new FormControl('', Validators.required)
  });


  constructor(
    private destinoService: DestinoService
  ) { }

  // Form


  ngOnInit() {
    this.destinoService.getDestinos().subscribe((destinosSnapshot) => {
      this.destinos = [];
      destinosSnapshot.forEach((destinoData: any) => {
        this.destinos.push({
          id: destinoData.payload.doc.id,
          data: destinoData.payload.doc.data()
        });
      });
    });
  }

  openModal(destino: Destino) {

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  /// Modal de edición
  openModal2(destino: Destino) {
    console.log(destino.id + ' destino');
    this.guardarId(destino as Destino);
    this.showModal2 = true;
    this.destinoService.getDestino(destino).valueChanges().subscribe((data: any) => {
      this.updateDestinoForm.patchValue({
        nombre: data.nombre
      });
      console.log(data.nombre);
    });
  }

  guardarId(id) {
    this.destino = id as Destino;
    console.log(this.destino.id + ' Desde guardar');
  }

  closeModal2() {
    this.showModal2 = false;
  }


  // Crear destino

  submitDestinoData() {
    this.showModal = false;
    this.destinoService.createDestino(this.newDestinoForm.value);
  }

  // Crear destino

  updateDestinoData() {
    console.log(this.destino.id + 'desde el componente');
    this.destinoService.updateDestino(this.updateDestinoForm.value, this.destino as Destino);
    this.showModal2 = false;
  }

  deleteDestino(destino) {
    this.destinoService.deleteDestino(destino);
  }


}
