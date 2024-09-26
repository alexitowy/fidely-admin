import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CanDeactivateGuard } from '../../core/guards/can-deactivate.guard';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'employee',
    component: EmployeeHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
