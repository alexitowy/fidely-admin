import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { SharedModule } from '../../shared/shared.module';
import { NotificacionesRoutingModule } from './notificaciones-routing.module';


@NgModule({
  declarations: [
    NotificacionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotificacionesRoutingModule
  ]
})
export class NotificacionesModule { }
