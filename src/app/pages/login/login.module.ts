import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './auth/auth.component';
import { LoginRoutingModule } from './login-routing.module';
import { RegisterComponent } from './register/register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StepperModule } from 'primeng/stepper';

@NgModule({
  declarations: [
    AuthComponent,
    ResetPasswordComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    DropdownModule,
    CheckboxModule,
    StepperModule
  ]
})
export class LoginModule { }
