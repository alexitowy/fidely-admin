import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css',
})
export class NotificacionesComponent {
  recentNotifications = [
    {
      id: 1,
      shopId: null,
      icon: 'pi pi-dollar',
      shopName: null,
      title: 'Compra de camiseta',
      desc: 'Has comprado una camiseta azul.',
      date: '2024-10-22T15:51:23.207Z',
      isNew: true,
      isRead: false,
      showDetails: false,
      extraData: {},
    },
    {
      id: 2,
      shopId: null,
      icon: 'pi pi-download',
      shopName: null,
      title: 'Solicitud de retiro',
      desc: 'Tu solicitud de retiro de $2500 ha sido iniciada.',
      date: '2024-10-16T15:51:23.207Z',
      isNew: false,
      isRead: true,
      showDetails: false,
      extraData: {},
    },
  ];

  oldNotifications = [
    {
      id: 6,
      shopId: null,
      icon: 'pi pi-dollar',
      shopName: null,
      title: 'Compra de chaqueta',
      desc: 'Has comprado una chaqueta negra.',
      date: '2024-10-15T15:51:23.207Z',
      isNew: false,
      isRead: true,
      showDetails: false,
      extraData: {},
    },
    {
      id: 8,
      shopId: null,
      icon: 'pi pi-question',
      shopName: null,
      title: 'Nueva pregunta',
      desc: 'Jane Davis ha hecho una nueva pregunta.',
      date: '2024-10-15T15:51:23.207Z',
      isNew: false,
      isRead: true,
      showDetails: false,
      extraData: {},
    },
  ];

  constructor(private readonly router: Router) { }

  markAsRead(notification: any): void {
    notification.read = true;
  }

  timeAgo(date: string): string {
    const notificationDate = new Date(date);
    const now = new Date();
    const diffInMs = now.getTime() - notificationDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} minutos`;
    } else if (diffInHours < 24) {
      return `hace ${diffInHours} horas`;
    } else {
      return `hace ${diffInDays} días`;
    }
  }

  redirectToAction(extraData: any): void {
    /* const url = `/shop/?extraData=${encodeURIComponent(
      JSON.stringify(extraData)
    )}`;
    this.router.navigateByUrl(url); */
  }
}
