import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register/register.component';


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
    LoginRoutingModule
  ]
})
export class LoginModule { }
