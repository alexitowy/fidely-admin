import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

const routes: Routes = [
  {
    path: '',
    component: NotificacionesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionesRoutingModule {}
