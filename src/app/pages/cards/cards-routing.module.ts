import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CardsComponent } from './cards/cards.component';

const routes: Routes = [
  {
    path: '',
    component: CardsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardsRoutingModule {}
