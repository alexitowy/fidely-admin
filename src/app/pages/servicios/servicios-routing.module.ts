import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ServiciosComponent } from './servicios/servicios.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosRoutingModule {}
