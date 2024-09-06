import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseAuthenticationService } from '../../services/firebase-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard {
  constructor(
    private readonly firebaseAuthService: FirebaseAuthenticationService,
    private router: Router
  ) {}

  public async canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.firebaseAuthService.getAuth().onAuthStateChanged((auth) => {
        if (!auth) {
          resolve(true);
        } else {
          this.router.navigateByUrl('dashboard');
          resolve(false);
        }
      });
    });
  }
}
