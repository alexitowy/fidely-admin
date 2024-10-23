import { Component } from '@angular/core';
import { EventService } from '../../../core/services/event.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  cards: any[] = [
    {
      id: 1,
      name: 'Corte de Pelo',
      description: 'Cada 5 cortes obtén uno gratis.',
      requiredServices: 5,
      reward: 'Corte Gratis',
      stamps: [true, true, false, false, false]
    },
    {
      id: 2,
      name: 'Limpieza Facial',
      description: 'Cada 10 limpiezas, una gratis.',
      requiredServices: 10,
      reward: 'Limpieza Gratis',
      stamps: [true, true, true, true, false, false, false, false, false, false]
    }
  ];
  cardDialog: boolean = false;
  card: any = {};
  editMode: boolean = false;
  rows = 5;
  totalRecords = 10;
  deleteDialog = false;
  cardsAux: any[];

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.cardsAux = [ ...this.cards ];
    this.loadServices({ first: 0, rows: this.rows });
  }

  loadServices(event: any) {
    const start = event.first;
    const end = start + event.rows;
    this.cardsAux = this.cards.slice(start, end);
  }

  openNew() {
    this.card = {};
    this.editMode = false;
    this.cardDialog = true;
  }

  editCard(card: any) {
    this.card = { ...card };
    this.editMode = true;
    this.cardDialog = true;
  }

  confirmDeleteCard(card: any) {
    this.card = { ...card };
    this.deleteDialog = true;
  }

  deleteCard(card: any) {
    this.cardsAux = this.cardsAux.filter(s => s.id !== card.id);
    this.cards = [ ...this.cardsAux ];
    this.deleteDialog = false;
    this.eventService.presentToastInfo(`Se ha eliminado la tarjeta ${card.name}`);
  }

  saveCard() {
    if (this.editMode) {
      const index = this.cardsAux.findIndex(s => s.id === this.card.id);
      this.cardsAux[index] = { ...this.card };
      this.eventService.presentToastSuccess('Tarjeta actualizada correctamente.');
    } else {
      this.card.id = this.cardsAux.length + 1;
      this.card.stamps = Array(this.card.requiredServices).fill(false);
      this.cardsAux.push({ ...this.card });
      this.eventService.presentToastSuccess('Tarjeta creada correctamente.');
    }
    this.cardDialog = false;
  }

  hideDialog() {
    this.cardDialog = false;
  }

  hideDeleteDialog() {
    this.deleteDialog = false;
  }

  toggleStamp(card: any, index: number) {
    card.stamps[index] = !card.stamps[index];
  }
}
