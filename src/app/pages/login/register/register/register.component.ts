import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from '../../../../services/firebase-authentication.service';
import { Router } from '@angular/router';
import { EventService } from '../../../../core/services/event.service';
import { Company } from '../../../../models/interfaces/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  showLoading: boolean = false;
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
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.fb.group({
      uid: [''],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      cif: ['', Validators.required],
      category: [null, Validators.required],
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
      this.eventService.presentToastDanger('Los datos introducidos son incorrectos.');
    } finally {
      this.showLoading = false;
    }
  }

  private async handleSuccessfulRegistration(uid: string, dataUser: Company) {
    await this.firebaseAuthService.updateUser(dataUser);
    this.registerForm.controls['uid'].setValue(uid);
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
      this.eventService.presentToastDanger('Ha ocurrido un error, intentelo más tarde.');
    }
  }

  navigateToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
