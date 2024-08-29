import { Component } from '@angular/core';
import { SignInProvider } from '../../../models/enums/singInProvider.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from '../../../services/firebase-authentication.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { UserForm } from '../../../models/interfaces/user.model';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api/message';
import { MessageToast } from '../../../models/enums/messageToast';

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
    password: new FormControl('', Validators.required),
  });

  constructor(
    private firebaseAuthService: FirebaseAuthenticationService,
    private utilsService: UtilsService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  onSubmit() {}

  presentToast(message: MessageToast) {
    this.messageService.add(message);
  }

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
      console.log(result);
      this.navigateToHome();

      this.presentToast({
        detail: `Bienvenido/a ${result.displayName}`,
        severity: 'success',
        life: 2000,
      });
    } catch (err) {
      this.presentToast({
        detail: 'No se ha completado el inicio de sesión.',
        severity: 'error',
        life: 2000,
      });
    } finally {
      this.showLoading = false;
    }
  }

  send() {
    if (this.loginForm.valid) {
      this.showLoading = true;

      this.firebaseAuthService
        .signIn(this.loginForm.value as UserForm)
        .then(() => {
          this.loginForm.reset();
          this.navigateToHome();
        })
        .catch((err) => {
          this.presentToast({
            detail: 'Los datos introducidos son incorrectos.',
            severity: 'error',
            life: 5000,
          });
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
    this.router.navigateByUrl('forgot-password');
  }

  navigateToHome(): void {
    this.router.navigateByUrl('/dashboard/home');
  }
}
