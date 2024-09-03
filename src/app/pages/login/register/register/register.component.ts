import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from '../../../../services/firebase-authentication.service';
import { Router } from '@angular/router';
import { EventService } from '../../../../core/services/event.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup(
    {
      companyName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      confirmEmail: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
  );
  showLoading: boolean = false;

  constructor(
    private readonly firebaseAuthService: FirebaseAuthenticationService,
    private router: Router,
    private eventService: EventService
  ) {}

  register(){

  }
}
