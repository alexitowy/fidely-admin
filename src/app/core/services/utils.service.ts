import { Injectable } from '@angular/core';
import { LayoutService } from '../../pages/dashboard/layout/app.layout.service';
import { FirebaseAuthenticationService } from '../../services/firebase-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(public layoutService: LayoutService,
    private readonly firebaseAuthService: FirebaseAuthenticationService
  ) {}

  get chartSize() {
    return this.layoutService.isMobile() ? '200px' : '350px';
  }

  isDataURL(str: string): boolean {
    const regex = /^\s*data:([a-z]+\/[a-z0-9-+.]+)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@\/?%\s]*\s*$/i;
    return !!str.match(regex);
  }

  async validateUserByEmail(typeUser: string,email: string) {
      const employeesQuery = await this.firebaseAuthService.getDocumentsByParam(
        typeUser,
        'email',
        '==',
        email
      );

      return employeesQuery.length > 0 ? employeesQuery[0] : null;
  }
}
