import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios/servicios.component';


@NgModule({
  declarations: [
    ServiciosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ServiciosRoutingModule,
  ]
})
export class ServiciosModule { }
