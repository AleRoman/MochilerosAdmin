import { Component, OnInit } from '@angular/core';
import { HotelesService } from 'src/app/services/hoteles.service';
import { Hotel } from 'src/app/models/hotel.model';
import { map } from 'rxjs/operators';
import { DestinoService } from 'src/app/services/destino.service';
@Component({
  selector: 'app-hoteles-list',
  templateUrl: './hoteles-list.component.html',
  styleUrls: ['./hoteles-list.component.scss']
})
export class HotelesListComponent implements OnInit {
  hoteles = [];
  destinos = [];

  constructor(
    private hotelesService: HotelesService,
    private destinoService: DestinoService
  ) { }

  ngOnInit() {
    this.hotelesService.getHoteles().snapshotChanges().subscribe((hotelesSnapshot) => {
      this.hoteles = [];
      hotelesSnapshot.forEach((hotelData: any) => {
        this.hoteles.push({
          id: hotelData.payload.doc.id,
          data: hotelData.payload.doc.data()
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


  deleteHotel(hotel) {
    this.hotelesService.deleteHotel(hotel);
  }


}
