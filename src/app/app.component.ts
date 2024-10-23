import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { EventService } from './core/services/event.service';
import { MessageToast } from './models/enums/messageToast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private eventService: EventService
  ) {
    this.eventService.toast$.subscribe((msg: MessageToast) => {
      this.messageService.add(msg);
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

}
