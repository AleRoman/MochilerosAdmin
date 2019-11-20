import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Firebase services */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';

/* Auth service */
import { AuthService } from './services/auth.service';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
// HTTP
import { HttpClientModule } from '@angular/common/http';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DestinosListComponent } from './components/destinos/destinos-list/destinos-list.component';
import { DestinoService } from './services/destino.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HotelesListComponent } from './components/hoteles/hoteles-list/hoteles-list.component';
import { HotelRegisterComponent } from './components/hoteles/hotel-register/hotel-register.component';
import { HotelEditComponent } from './components/hoteles/hotel-edit/hotel-edit.component';
import { RestauranteListComponent } from './components/restaurantes/restaurante-list/restaurante-list.component';
import { RestauranteRegisterComponent } from './components/restaurantes/restaurante-register/restaurante-register.component';
import { RestauranteEditarComponent } from './components/restaurantes/restaurante-editar/restaurante-editar.component';
import { ActividadesListComponent } from './components/actividades/actividades-list/actividades-list.component';
import { ActividadesRegisterComponent } from './components/actividades/actividades-register/actividades-register.component';
import { ActividadesEditComponent } from './components/actividades/actividades-edit/actividades-edit.component';
import { HotelesService } from './services/hoteles.service';
import { RestaurantesService } from './services/restaurantes.service';
import { ActividadesService } from './services/actividades.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppMenuComponent,
    DashboardComponent,
    DestinosListComponent,
    HotelesListComponent,
    HotelRegisterComponent,
    HotelEditComponent,
    RestauranteListComponent,
    RestauranteRegisterComponent,
    RestauranteEditarComponent,
    ActividadesListComponent,
    ActividadesRegisterComponent,
    ActividadesEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule, // Fomularios,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    DestinoService,
    HotelesService,
    RestaurantesService,
    ActividadesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
