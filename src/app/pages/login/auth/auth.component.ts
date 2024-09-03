import { Component } from '@angular/core';
import { SignInProvider } from '../../../models/enums/singInProvider.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from '../../../services/firebase-authentication.service';
import { UserForm } from '../../../models/interfaces/user.model';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { MessageService } from 'primeng/api';
import { MessageToast } from '../../../models/enums/messageToast';
import { EventService } from '../../../core/services/event.service';

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
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private firebaseAuthService: FirebaseAuthenticationService,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit() {}

  onSubmit() {}


  async signInWith(provider: SignInProvider) {
    this.showLoading = true;
    let result: User;
    try {
      switch (provider) {
        /* case SignInProvider.apple:
          result = await this.firebaseAuthService.signInWithApple();
          break; */
        case SignInProvider.facebook:
          result = await this.firebaseAuthService.signInWithFacebook();
          break;
        case SignInProvider.google:
          result = await this.firebaseAuthService.signInWithGoogle();
          break;
        case SignInProvider.twitter:
          result = await this.firebaseAuthService.signInWithTwitter();
          break;
      }
      this.navigateToHome();

      this.eventService.presentToastSuccess(`Bienvenido/a ${result.displayName}`);
    } catch (err) {
      this.eventService.presentToastDanger('No se ha completado el inicio de sesión.');
    } finally {
      this.showLoading = false;
    }
  }

  TOSTAST(){
    this.eventService.presentToastDanger('No se ha completado el inicio de sesión.');
  }

  send() {
    if (this.loginForm.valid) {
      this.showLoading = true;

      this.firebaseAuthService
        .signIn(this.loginForm.value as UserForm)
        .then((result) => {
          this.loginForm.reset();
          this.navigateToHome();
          this.eventService.presentToastSuccess(`Bienvenido/a ${result.displayName}`);
        })
        .catch((err) => {
          this.eventService.presentToastDanger('Los datos introducidos son incorrectos.');
        })
        .finally(() => {
          this.showLoading = false;
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  goToForgotPage() {
    this.loginForm.reset();
    this.router.navigateByUrl('auth/forgot-password');
  }

  navigateToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
