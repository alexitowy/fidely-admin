import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { AppLayoutComponent } from './pages/dashboard/layout/app.layout.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: AppLayoutComponent,
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'notificaciones',
    component: AppLayoutComponent,
    loadChildren: () =>
      import('./pages/notificaciones/notificaciones.module').then(
        (m) => m.NotificacionesModule
      ),
  },
  {
    path: 'servicios',
    component: AppLayoutComponent,
    loadChildren: () =>
      import('./pages/servicios/servicios.module').then(
        (m) => m.ServiciosModule
      ),
  },
  {
    path: 'cards',
    component: AppLayoutComponent,
    loadChildren: () =>
      import('./pages/cards/cards.module').then(
        (m) => m.CardsModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
