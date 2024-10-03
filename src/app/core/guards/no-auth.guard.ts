import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Company, Employee } from '../../models/interfaces/user.model';
import { FirebaseAuthenticationService } from '../../services/firebase-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard {
  private authUnsubscribe: (() => void) | null = null;
  constructor(
    private readonly firebaseAuthService: FirebaseAuthenticationService,
    private router: Router
  ) {}

  public async canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.authUnsubscribe) {
        this.authUnsubscribe();
      }
      this.authUnsubscribe = this.firebaseAuthService.getAuth().onAuthStateChanged(async (auth) => {
        if (!auth) {
          resolve(true);
        } else {
          const user = await this.getUserOrEmployee(auth.uid);

          if (user) {
            const { role } = user;
            if (role === 'ADMIN') {
              this.router.navigateByUrl('dashboard');
            } else {
              this.router.navigateByUrl('dashboard/employee');
            }
          }
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
