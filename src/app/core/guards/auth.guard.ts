import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Company, Employee } from '../../models/interfaces/user.model';
import { FirebaseAuthenticationService } from '../../services/firebase-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private authUnsubscribe: (() => void) | null = null;
  constructor(
    private readonly firebaseAuthService: FirebaseAuthenticationService,
    private router: Router
  ) {}

  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      const userLocal = JSON.parse(localStorage.getItem('user'));

      if (this.authUnsubscribe) {
        this.authUnsubscribe();
      }

      this.authUnsubscribe = this.firebaseAuthService.getAuth().onAuthStateChanged(async (auth) => {
        if (auth) {
          const allowedRoles = route.data['roles'] as Array<string>;
          
          let user;

          if (userLocal) {
            user = userLocal;
          } else {
            user = await this.getUserOrEmployee(auth.uid);
            localStorage.setItem('user', JSON.stringify(user));
          }

          if (user) {
            const { role } = user;
            if (role === 'SUPERADMIN' || allowedRoles.includes(role)) {
              resolve(true);
            } else {
              this.router.navigateByUrl('auth');
              resolve(false);
            }
          }
        } else {
          this.router.navigateByUrl('auth');
          resolve(false);
        }
      });
    });
  }

  private async getUserOrEmployee(
    uid: string
  ): Promise<Employee | Company | null> {
    const admin = (await this.firebaseAuthService.getDocument(
      `users/${uid}`
    )) as Company;
    if (admin) {
      return admin;
    }

    const employee = (await this.firebaseAuthService.getDocument(
      `employees/${uid}`
    )) as Employee;
    return employee || null;
  }
}
