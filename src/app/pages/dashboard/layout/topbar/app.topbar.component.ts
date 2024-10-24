import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../app.layout.service';
import { FirebaseAuthenticationService } from '../../../../services/firebase-authentication.service';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private readonly firebaseAuthenticationService: FirebaseAuthenticationService
    ) { }

    signOut(){
        this.firebaseAuthenticationService.signOut();
        localStorage.removeItem('user');
        this.router.navigateByUrl('/auth');
    }

      goToNotificationsPage(op: OverlayPanel){
        op.hide();
        this.router.navigateByUrl('/notificaciones');
      }
}
