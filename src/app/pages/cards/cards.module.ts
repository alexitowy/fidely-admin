import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { SharedModule } from '../../shared/shared.module';
import { CardsRoutingModule } from './cards-routing.module';



@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardsRoutingModule
  ]
})
export class CardsModule { }
