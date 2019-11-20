import { Component, OnInit, NgZone } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';
import { DestinoService } from 'src/app/services/destino.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-actividades-register',
  templateUrl: './actividades-register.component.html',
  styleUrls: ['./actividades-register.component.scss']
})
export class ActividadesRegisterComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  public porcentaje = 0;
  public finalizado = false;
  public URLPublica = '';

  destinos = [];

  constructor(
    private actividadesService: ActividadesService,
    private destinoService: DestinoService,
    public ngZone: NgZone,
    public router: Router
  ) { }

  // Form
  public actividadForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    precio_promedio: new FormControl('', Validators.required),
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
  public submitActividadData() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    const archivo = formData.get('file');
    this.fileUploadProgress = '0%';
    const referencia = this.actividadesService.referenciaCloudStorage(this.fileData.name);
    const tarea = this.actividadesService.tareaCloudStorage(this.fileData.name, archivo);

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
          this.actividadesService.createActividad(this.actividadForm.value, this.URLPublica);
        });

      this.ngZone.run(() => {
        this.router.navigate(['/actividades']);
      });
    });
  }

}
