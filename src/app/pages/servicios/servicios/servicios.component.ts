import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

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
  editMode = false; 
  service = { id: null, name: '', description: '', price: null };
  rows = 5;
  totalRecords = 10;

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
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
      const index = this.services.findIndex(s => s.id === this.service.id);
      this.services[index] = { ...this.service };
    } else {
      this.service.id = this.services.length + 1;
      this.services.push({ ...this.service });
    }
    this.serviceDialog = false;
  }

  confirmDeleteService(service: any) {
    console.log('entraaaaa');
    
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar el servicio "${service.name}"?`,
      accept: () => {
        this.deleteService(service);
      }
    });
  }

  deleteService(service: any) {
    this.services = this.services.filter(s => s.id !== service.id);
  }

  hideDialog() {
    this.serviceDialog = false;
  }

  loadServices(event: any) {
    const start = event.first;
    const end = start + event.rows;
    this.services = this.services.slice(start, end);
  }
}
