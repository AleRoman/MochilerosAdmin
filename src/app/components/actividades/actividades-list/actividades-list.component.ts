import { Component, OnInit } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';
import { DestinoService } from 'src/app/services/destino.service';

@Component({
  selector: 'app-actividades-list',
  templateUrl: './actividades-list.component.html',
  styleUrls: ['./actividades-list.component.scss']
})
export class ActividadesListComponent implements OnInit {
  actividades = [];
  destinos = [];

  constructor(
    private actividadesService: ActividadesService,
    private destinoService: DestinoService
  ) { }

  ngOnInit() {
    this.actividadesService.getActividades().snapshotChanges().subscribe((actividadesSnapshot) => {
      this.actividades = [];
      actividadesSnapshot.forEach((actividadData: any) => {
        this.actividades.push({
          id: actividadData.payload.doc.id,
          data: actividadData.payload.doc.data()
        });
      });
    });

    this.destinoService.getDestinos().subscribe((destinosSnapshot) => {
      this.destinos = [];
      destinosSnapshot.forEach((destinoData: any) => {
        this.destinos.push({
          id: destinoData.payload.doc.id,
          data: destinoData.payload.doc.data()
        });

        console.log(this.destinos[0].id);
      });
    });

  }


  deleteHotel(actividad) {
    this.actividadesService.deleteActividad(actividad);
  }
}
