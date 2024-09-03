import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { authGuard } from './core/guards/auth.guard';
import { AppLayoutComponent } from './pages/dashboard/layout/app.layout.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: AppLayoutComponent,
    loadChildren: () =>
      import('./pages/dashboard/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [noAuthGuard],
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
