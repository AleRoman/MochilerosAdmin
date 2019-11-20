import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DestinosListComponent } from './components/destinos/destinos-list/destinos-list.component';
import { HotelesListComponent } from './components/hoteles/hoteles-list/hoteles-list.component';
import { HotelRegisterComponent } from './components/hoteles/hotel-register/hotel-register.component';
import { HotelEditComponent } from './components/hoteles/hotel-edit/hotel-edit.component';
import { RestauranteListComponent } from './components/restaurantes/restaurante-list/restaurante-list.component';
import { RestauranteRegisterComponent } from './components/restaurantes/restaurante-register/restaurante-register.component';
import { RestauranteEditarComponent } from './components/restaurantes/restaurante-editar/restaurante-editar.component';
import { ActividadesListComponent } from './components/actividades/actividades-list/actividades-list.component';
import { ActividadesRegisterComponent } from './components/actividades/actividades-register/actividades-register.component';
import { ActividadesEditComponent } from './components/actividades/actividades-edit/actividades-edit.component';


const routes: Routes = [
  {path : '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'destinos', component: DestinosListComponent},
  {path: 'hoteles', component: HotelesListComponent},
  {path: 'hotel-register', component: HotelRegisterComponent},
  {path: 'hotel-edit/:id', component: HotelEditComponent},
  {path: 'restaurantes', component: RestauranteListComponent},
  {path: 'restaurante-register', component: RestauranteRegisterComponent},
  {path: 'restaurante-edit/:id', component: RestauranteEditarComponent},
  {path: 'actividades', component: ActividadesListComponent},
  {path: 'actividad-register', component: ActividadesRegisterComponent},
  {path: 'actividad-edit/:id', component: ActividadesEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
