import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api/message';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private messageService: MessageService) {}

  presentToast(message: Message) {
    this.messageService.add(message);
  }

  presentToastDanger(
    detail: string,
    duration = 7000,
    position: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br' | 'center' = 'tr',
    title?: string,
    icon?: string,
    closable?: boolean
  ) {
    console.log('entra a mostrar')
    this.presentToast({
      severity: 'error',
      detail,
      life: duration,
      key: position,
      summary: title,
      icon,
      closable,
    });
  }

  presentToastWarning(
    detail: string,
    duration = 1500,
    position: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br' | 'center' = 'br',
    title?: string,
    icon?: string,
    closable?: boolean
  ) {
    this.presentToast({
      severity: 'warning',
      detail,
      life: duration,
      key: position,
      summary: title,
      icon,
      closable,
    });
  }

  presentToastInfo(
    detail: string,
    duration = 1500,
    position: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br' | 'center' = 'br',
    title?: string,
    icon?: string,
    closable?: boolean
  ) {
    this.presentToast({
      severity: 'info',
      detail,
      life: duration,
      key: position,
      summary: title,
      icon,
      closable,
    });
  }

  presentToastSuccess(
    detail: string,
    duration = 2000,
    position: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br' | 'center' = 'br',
    title?: string,
    icon?: string,
    closable?: boolean
  ) {
    this.presentToast({
      severity: 'success',
      detail,
      life: duration,
      key: position,
      summary: title,
      icon,
      closable,
    });
  }
}
