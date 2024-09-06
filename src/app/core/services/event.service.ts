import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageToast } from '../../models/enums/messageToast';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  toast$ = new Subject<MessageToast>();

  constructor() {}

  presentToast(message: MessageToast) {
    this.toast$.next(message);
  }

  presentToastDanger(
    detail: string,
    duration = 5000,
    title?: string,
    icon?: string,
    closable?: boolean
  ) {
    this.presentToast({
      severity: 'error',
      detail,
      life: duration,
      key: 'br',
      summary: title,
      icon,
      closable,
    });
  }

  presentToastWarning(
    detail: string,
    duration = 2000,
    title?: string,
    icon?: string,
    closable?: boolean
  ) {
    this.presentToast({
      severity: 'warn',
      detail,
      life: duration,
      key: 'br',
      summary: title,
      icon,
      closable,
    });
  }

  presentToastInfo(
    detail: string,
    duration = 3000,
    title?: string,
    icon?: string,
    closable?: boolean
  ) {
    this.presentToast({
      severity: 'info',
      detail,
      life: duration,
      key: 'br',
      summary: title,
      icon,
      closable,
    });
  }

  presentToastSuccess(
    detail: string,
    duration = 2000,
    title?: string,
    icon?: string,
    closable?: boolean
  ) {
    this.presentToast({
      severity: 'success',
      detail,
      life: duration,
      key: 'br',
      summary: title,
      icon,
      closable,
    });
  }
}
