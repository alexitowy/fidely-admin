import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios/servicios.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    ServiciosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ServiciosRoutingModule,
    ConfirmDialogModule
  ]
})
export class ServiciosModule { }
