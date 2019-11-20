import { Component, OnInit } from '@angular/core';
import { RestaurantesService } from 'src/app/services/restaurantes.service';
import { DestinoService } from 'src/app/services/destino.service';

@Component({
  selector: 'app-restaurante-list',
  templateUrl: './restaurante-list.component.html',
  styleUrls: ['./restaurante-list.component.scss']
})
export class RestauranteListComponent implements OnInit {
  restaurantes = [];
  destinos = [];

  constructor(
    private restaurantesService: RestaurantesService,
    private destinoService: DestinoService
  ) { }

  ngOnInit() {
    this.restaurantesService.getRestaurantes().snapshotChanges().subscribe((restaurantesSnapshot) => {
      this.restaurantes = [];
      restaurantesSnapshot.forEach((restauranteData: any) => {
        this.restaurantes.push({
          id: restauranteData.payload.doc.id,
          data: restauranteData.payload.doc.data()
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


  deleteRestaurante(restaurante) {
    this.restaurantesService.deleteRestaurante(restaurante);
  }



}
