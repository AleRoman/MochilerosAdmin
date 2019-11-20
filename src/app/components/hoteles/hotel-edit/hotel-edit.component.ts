import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelesService } from 'src/app/services/hoteles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DestinoService } from 'src/app/services/destino.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.scss']
})
export class HotelEditComponent implements OnInit {
  id = '';
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  public porcentaje = 0;
  public finalizado = false;
  public URLPublica = '';
  public cambio = false;

  destinos = [];
  constructor(
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private hotelesService: HotelesService,
    private destinoService: DestinoService,
    public ngZone: NgZone,
    public router: Router
  ) { }

  // Form
  public hotelForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    precio_noche: new FormControl('', Validators.required),
    locacion: new FormControl('', Validators.required),
    destinoReference: new FormControl('', Validators.required)
  });


  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.hotelesService.getHotel(this.id).valueChanges().subscribe((data: any) => {
      console.log(data);
      this.previewUrl = data.urlImage;
      this.URLPublica = data.urlImage;
      this.hotelForm.patchValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio_noche: data.precio_noche,
        locacion: data.locacion,
        destinoReference: data.destinoReference
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




  fileProgress(fileInput: any) {
    this.URLPublica = '';
    this.cambio = true;
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  // Sube el archivo a Cloud Storage y crea el hotel
  public submitHotelData() {
    if (this.cambio === true) {
      const formData = new FormData();
      formData.append('file', this.fileData);
      const archivo = formData.get('file');
      this.fileUploadProgress = '0%';
      const referencia = this.hotelesService.referenciaCloudStorage(this.fileData.name);
      const tarea = this.hotelesService.tareaCloudStorage(this.fileData.name, archivo);

      // Cambia el porcentaje
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.fileUploadProgress = Math.round(porcentaje / porcentaje * 100) + '%';
        if (this.porcentaje === 100) {
          this.finalizado = true;
        }
      });

      tarea.then(res => {
        referencia.getDownloadURL()
          .subscribe((URL) => {
            this.URLPublica = URL;
            console.log(this.URLPublica);
            this.hotelesService.updateHotel(this.hotelForm.value, this.id, this.URLPublica);
          });

        this.ngZone.run(() => {
          this.router.navigate(['/hoteles']);
        });
      });
    } else {
      this.hotelesService.updateHotel(this.hotelForm.value, this.id, this.URLPublica);

      this.ngZone.run(() => {
        this.router.navigate(['/hoteles']);
      });
    }

  }

}
