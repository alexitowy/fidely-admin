import { Component } from '@angular/core';
import { EventService } from '../../../core/services/event.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  services = [
    { id: 1, name: 'Corte de Cabello', description: 'Servicio completo de peluquería', price: 25 },
    { id: 2, name: 'Manicura', description: 'Cuidado de uñas profesional', price: 15 },
    { id: 3, name: 'Masaje Relajante', description: 'Masaje de cuerpo completo', price: 50 },
  ];

  serviceDialog = false;
  deleteDialog = false;
  editMode = false; 
  service = { id: null, name: '', description: '', price: null };
  rows = 5;
  totalRecords = 10;
  servicesAux: any[];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.servicesAux = [ ...this.services ];
    this.loadServices({ first: 0, rows: this.rows });
  }

  openCreateServiceModal() {
    this.editMode = false;
    this.service = { id: null, name: '', description: '', price: null };
    this.serviceDialog = true;
  }

  openEditServiceModal(service: any) {
    this.editMode = true;
    this.service = { ...service };
    this.serviceDialog = true;
  }

  saveService() {
    if (this.editMode) {
      const index = this.servicesAux.findIndex(s => s.id === this.service.id);
      this.servicesAux[index] = { ...this.service };
      this.eventService.presentToastSuccess('Servicio actualizado correctamente.');
    } else {
      this.service.id = this.servicesAux.length + 1;
      this.servicesAux.push({ ...this.service });
      this.eventService.presentToastSuccess('Servicio creado correctamente.');
    }
    this.services = [ ...this.servicesAux ];
    this.serviceDialog = false;
  }

  confirmDeleteService(service: any) {
    this.service = { ...service };
    this.deleteDialog = true;
  }

  deleteService(service: any) {
    this.servicesAux = this.servicesAux.filter(s => s.id !== service.id);
    this.services = [ ...this.servicesAux ];
    this.deleteDialog = false;
    this.eventService.presentToastInfo(`Se ha eliminado el servicio ${service.name}`);
  }

  hideDialog() {
    this.serviceDialog = false;
  }

  hideDeleteDialog() {
    this.deleteDialog = false;
  }

  loadServices(event: any) {
    const start = event.first;
    const end = start + event.rows;
    this.servicesAux = this.services.slice(start, end);
  }
}
