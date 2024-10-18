import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Notificaciones', icon: 'pi pi-fw pi-bell', routerLink: ['/notificaciones'] },
                    { label: 'Servicios', icon: 'pi pi-fw pi-objects-column', routerLink: ['/servicios'] }
                ]
            },
        ];
    }
}
