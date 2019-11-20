import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { HotelesService } from 'src/app/services/hoteles.service';
import { DestinoService } from 'src/app/services/destino.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-register',
  templateUrl: './hotel-register.component.html',
  styleUrls: ['./hotel-register.component.scss']
})
export class HotelRegisterComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  public porcentaje = 0;
  public finalizado = false;
  public URLPublica = '';

  destinos = [];

  constructor(
    private http: HttpClient,
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
          this.hotelesService.createHotel(this.hotelForm.value, this.URLPublica);
        });

      this.ngZone.run(() => {
        this.router.navigate(['/hoteles']);
      });
    });
  }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('files', this.fileData);

  //   this.fileUploadProgress = '0%';

  //   this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   })
  //     .subscribe(events => {
  //       if (events.type === HttpEventType.UploadProgress) {
  //         this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
  //         console.log(this.fileUploadProgress);
  //       } else if (events.type === HttpEventType.Response) {
  //         this.fileUploadProgress = '';
  //         console.log(events.body);
  //         console.log(events.body.filePath);
  //         alert('SUCCESS !!');
  //       }

  //     });
  // }


  // Crear hotel


}
