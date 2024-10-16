import { Component } from '@angular/core';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent {
  recentNotifications = [
    {
      title: 'Compra de camiseta',
      description: 'Has comprado una camiseta azul.',
      time: 'Hace 2 horas',
      date: '2024-10-16',
      action: 'Ninguna acción requerida',
      icon: 'pi pi-dollar',
      details: 'Detalle completo de la compra.',
      showDetails: false,
    },
    {
      title: 'Solicitud de retiro',
      description: 'Tu solicitud de retiro de $2500 ha sido iniciada.',
      time: 'Hoy',
      date: '2024-10-16',
      action: 'Confirma en 24 horas',
      icon: 'pi pi-download',
      details: 'Proceso de retiro iniciado en la cuenta XXXXXX.',
      showDetails: false,
    },
  ];

  oldNotifications = [
    {
      title: 'Compra de chaqueta',
      description: 'Has comprado una chaqueta negra.',
      time: 'Hace 3 días',
      date: '2024-10-13',
      action: 'Ninguna acción requerida',
      icon: 'pi pi-dollar',
      details: 'Detalle de la compra de la chaqueta.',
      showDetails: false,
    },
    {
      title: 'Nueva pregunta',
      description: 'Jane Davis ha hecho una nueva pregunta.',
      time: 'Hace 1 semana',
      date: '2024-10-09',
      action: 'Responde antes de 3 días',
      icon: 'pi pi-question',
      details: 'La pregunta fue sobre el producto X.',
      showDetails: false,
    },
  ];

  showDetails(notification: any) {
    notification.showDetails = !notification.showDetails;
  }

  ngOnInit() {

  }
}
