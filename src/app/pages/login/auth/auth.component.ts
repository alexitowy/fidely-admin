import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { EventService } from '../../../core/services/event.service';
import { SignInProvider } from '../../../models/enums/singInProvider.enum';
import {
  Company,
  Employee,
} from '../../../models/interfaces/user.model';
import { FirebaseAuthenticationService } from '../../../services/firebase-authentication.service';
import { UtilsService } from '../../../core/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  providers = SignInProvider;
  showLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private firebaseAuthService: FirebaseAuthenticationService,
    private router: Router,
    private eventService: EventService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {}

  onSubmit() {}

  async signInWith(provider: SignInProvider) {
    this.showLoading = true;
    try {
      const result = await this.firebaseAuthService.signInWithSocialNetwork(provider);
      if (result) {
        const existUser = await this.utilsService.validateUserByEmail(
          'users',
          result.email
        );
        const existEmployee = await this.utilsService.validateUserByEmail(
          'employees',
          result.email
        );

        if (!existUser && !existEmployee) {
          const dataUser: Company = {
            email: result.email,
            id: result.uid,
            companyName: result.displayName,
            role: 'ADMIN',
          };
          await this.registerUserWhenSignWithSocialNetwork(dataUser);
        } else if (existEmployee !== null) {
          const dataEmployee: Employee = {
            email: result.email,
            id: result.uid,
            idUser: existEmployee.idUser,
            role: 'EMPLOYEE',
          };
          await this.registerEmployeeWhenSignWithSocialNetwork(dataEmployee, existEmployee);
        }
        this.redirectUser(
          existEmployee,
          existEmployee !== null ? result.email : result.displayName
        );
      }
    } catch (err) {
      console.log(err);

      this.eventService.presentToastDanger(
        'No se ha completado el inicio de sesión.'
      );
    } finally {
      this.showLoading = false;
    }
  }

  private async registerUserWhenSignWithSocialNetwork(
    dataUser: Company
  ) {
    const path = `users/${dataUser.id}`;
    try {
      await this.firebaseAuthService.setDocument(path, dataUser);
    } catch (err) {
      this.eventService.presentToastDanger(
        'Ha ocurrido un error, intentelo más tarde.'
      );
    }
  }

  private async registerEmployeeWhenSignWithSocialNetwork(
    dataEmployee: Employee,
    oldData
  ) {
    const path = `employees/${dataEmployee.id}`;

    await this.firebaseAuthService.setDocument(path, dataEmployee);

    const pathEmployee = `employees/${oldData.id}`;

    await this.firebaseAuthService.deleteDocument(pathEmployee);
  }

  async send() {
    if (this.loginForm.valid) {
      this.showLoading = true;

      this.firebaseAuthService
        .signIn(this.loginForm.value as Company)
        .then(async (result) => {
          const existEmployee = await this.utilsService.validateUserByEmail(
            'employees',
            this.loginForm.value.email
          );
          this.redirectUser(
            existEmployee,
            existEmployee !== null ? this.loginForm.value.email : result.displayName
          );
        })
        .catch(async (err) => {})
        .finally(() => {
          this.showLoading = false;
        });
    } else {
      this.loginForm.reset();
      this.loginForm.markAllAsTouched();
    }
  }

  redirectUser(isEmployee: boolean, label: string) {
    if (isEmployee !== null) {
      this.navigateToDashboardEmployee();
    } else {
      this.navigateToHome();
    }

    this.eventService.presentToastSuccess(`Bienvenido/a ${label}`);
  }

  goToForgotPage() {
    this.loginForm.reset();
    this.router.navigateByUrl('auth/forgot-password');
  }

  navigateToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }
  navigateToDashboardEmployee(): void {
    this.router.navigateByUrl('/dashboard/employee');
  }
}
