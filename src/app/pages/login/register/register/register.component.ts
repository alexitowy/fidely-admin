import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FirebaseAuthenticationService } from '../../../../services/firebase-authentication.service';
import { Router } from '@angular/router';
import { EventService } from '../../../../core/services/event.service';
import { Company, Employee } from '../../../../models/interfaces/user.model';
import { UtilsService } from '../../../../core/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  employeeForm: FormGroup;
  showLoading: boolean = false;
  isEmployee: boolean = false;
  foundEmployee: boolean = false;
  activeIndex: number = 0;
  idAdmin: string;
  employee: Employee;
  categories = [
    {
      id: 1,
      name: 'Belleza',
      description: 'Estetica y belleza',
      icon: 'estatica-icon',
    },
    {
      id: 2,
      name: 'Barberia',
      description: 'Peluqueria caballeros',
      icon: 'barberia-icon',
    },
    {
      id: 3,
      name: 'Lavanderia',
      description: 'Lavado y secado',
      icon: 'lavanderia-icon',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private readonly firebaseAuthService: FirebaseAuthenticationService,
    private router: Router,
    private eventService: EventService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.buildFormEmployee();
  }

  buildForm() {
    this.registerForm = this.fb.group({
      id: [''],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      defaultAddress: ['', Validators.required],
      cif: ['', Validators.required],
      category: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  buildFormEmployee() {
    this.employeeForm = this.fb.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.showLoading = true;
    try {
      const dataUser: Company = this.registerForm.value;
      const result = await this.firebaseAuthService.register(dataUser);
      await this.handleSuccessfulRegistration(result.uid, dataUser);
    } catch (err) {
      console.log(err);
      
      this.eventService.presentToastDanger(
        'Los datos introducidos son incorrectos.'
      );
    } finally {
      this.showLoading = false;
    }
  }

  private async handleSuccessfulRegistration(uid: string, dataUser: Company) {
    await this.firebaseAuthService.updateUser(dataUser);
    this.registerForm.controls['id'].setValue(uid);
    await this.setUserInfo(uid);
    this.router.navigateByUrl('auth');
    this.registerForm.reset();
    this.eventService.presentToastSuccess('Se ha registrado correctamente.');
  }

  private async setUserInfo(uid: string) {
    const dataUser: Company = { ...this.registerForm.value, role: 'ADMIN' };
    delete dataUser.password;

    const path = `users/${uid}`;
    try {
      await this.firebaseAuthService.setDocument(path, dataUser);
    } catch (err) {
      console.log(err);
      
      this.eventService.presentToastDanger(
        'Ha ocurrido un error, intentelo más tarde.'
      );
    }
  }

  async validateEmailListEmployee() {
    if (this.employeeForm.controls['email'].invalid) {
      return;
    }
    this.foundEmployee = false;
    const existEmployee= await this.utilsService.validateUserByEmail('employees',this.employeeForm.value.email);
    this.foundEmployee = existEmployee !== null ? true : false;
    if (!this.foundEmployee) {
      this.eventService.presentToastDanger(
        'El correo no pertenece a ninguna empresa.'
      );
    } else {
      this.employee = existEmployee;
      this.activeIndex += 1;
    }
  }

  async registerEmployee() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.showLoading = true;
    try {
      let dataEmployee: Employee = { password: this.employeeForm.value.password, ...this.employee};
      const result = await this.firebaseAuthService.register(dataEmployee);
      delete dataEmployee.password;
      
          const path = `employees/${result.uid}`;
          dataEmployee.id = result.uid;

          await this.firebaseAuthService.setDocument(path, dataEmployee);

          const pathEmployee = `employees/${this.employee.id}`;

          await this.firebaseAuthService.deleteDocument(pathEmployee);

          this.employeeForm.reset();
          this.router.navigateByUrl('auth');
          this.eventService.presentToastSuccess(
            'Empleado registrado con éxito.'
          );
    } catch (err) {
      this.eventService.presentToastDanger(
        'No se pudo registrar al empleado, intentelo mas tarde.'
      );
    } finally {
      this.showLoading = false;
    }
  }

  prevStep(){
    this.activeIndex -= 1;
  }

  navigateToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
