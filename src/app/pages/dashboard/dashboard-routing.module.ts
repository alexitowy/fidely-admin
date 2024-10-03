import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CanDeactivateGuard } from '../../core/guards/can-deactivate.guard';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'employee',
    component: EmployeeHomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['EMPLOYEE'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
